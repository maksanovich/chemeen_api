import { Request, Response } from 'express';
import { ItemDetailModel } from "../../models/product/itemDetail.model";
import { CodeListModel } from "../../models/product/codeList.model";
import { TraceAbilityModel } from "../../models/product/traceAbility.model";
import { convertId } from '../../common/utils';
import sequelize from '../../config/sequelize';
import { QueryTypes, Op } from 'sequelize';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type, ItemId } = req.query;
    console.log(type, '===', ItemId);

    try {
        try {
            switch (type) {
                case 'PRSG': {
                    const query = `
                            SELECT 
                            pd.PRSGId, 
                            pd.cartons,
                            (SELECT psg.PRSGDesc FROM tbl_prsg as psg WHERE psg.PRSGId = pd.PRSGId) as value
                            FROM 
                            tbl_item_details as pd 
                            WHERE pd.ItemId = :ItemId
                        `;

                    const results = await sequelize.query(query, {
                        replacements: { ItemId },
                        type: QueryTypes.SELECT
                    });
                    res.status(200).send(results);
                } break;
                case 'sumCartons': {
                    const query = `
                            SELECT SUM(COALESCE(cartons, 0)) as sumCartons
                            FROM tbl_item_details
                            WHERE ItemId = :ItemId;
                        `;

                    const results = await sequelize.query(query, {
                        replacements: { ItemId },
                        type: QueryTypes.SELECT
                    });
                    res.status(200).send(results[0]);
                } break;
                default: {
                    const items = await ItemDetailModel.findAll({ order: [['createdAt', 'DESC']] });
                    const result = convertId(items, 'itemDetailId');
                    res.status(200).send(result);
                } break;
            }
        } catch (e) {
            res.status(500).send(e);
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const results = await getItem(id);
        if (results) {
            res.status(200).send(results);
        } else {
            res.status(404).send([]);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const findByPIId = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const results = await getItemByPIID(id);
        if (results) {
            res.status(200).send(results);
        } else {
            res.status(404).send([]);
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ItemId, details } = req.body;
        console.log(ItemId, details, '-=======');


        if (!ItemId || !Array.isArray(details)) {
            res.status(400).send({ error: 'Invalid input data' });
        } else {
            await Promise.all(details.map(async (detail) => {
                return await ItemDetailModel.create({
                    ...detail,
                    ItemId,
                });
            }));

            const results = await getItem(ItemId);
            res.status(200).send(results);
        }

    } catch (e) {
        res.status(500).send(e);
    }
};

// Helper function to update code list totals with smart logic
const updateCodeListTotals = async (ItemId: number, newTotalCartons: number) => {
    try {
        console.log(`Updating code list totals for ItemId: ${ItemId}, newTotalCartons: ${newTotalCartons}`);
        
        // Get all code list entries for this item, ordered by creation date (latest first for deletion)
        const codeListEntries: any[] = await CodeListModel.findAll({
            where: { ItemId: ItemId },
            order: [['createdAt', 'DESC']]
        });

        if (codeListEntries.length === 0) {
            console.log('No code list entries found for this item');
            return;
        }

        // Calculate current total of all codelist entries
        const currentCodeListTotal = codeListEntries.reduce((sum, entry) => sum + (Number(entry.value) || 0), 0);
        console.log(`Current codelist total: ${currentCodeListTotal}, New product total: ${newTotalCartons}`);

        // If new product total < current codelist total, need to reduce/delete entries
        if (newTotalCartons < currentCodeListTotal) {
            console.log('Product total decreased - reducing codelist entries');
            let excessAmount = currentCodeListTotal - newTotalCartons;
            console.log(`Need to reduce by: ${excessAmount}`);

            // Start from latest entries and reduce/delete until we match new total
            for (const entry of codeListEntries) {
                if (excessAmount <= 0) break;

                const entryValue = Number(entry.value) || 0;
                
                if (entryValue <= excessAmount) {
                    // Delete entire entry
                    console.log(`Deleting entry codeId ${entry.codeId} with value ${entryValue}`);
                    await CodeListModel.destroy({ where: { codeId: entry.codeId } });
                    excessAmount -= entryValue;
                } else {
                    // Reduce entry value
                    const newValue = entryValue - excessAmount;
                    console.log(`Reducing entry codeId ${entry.codeId} from ${entryValue} to ${newValue}`);
                    await CodeListModel.update(
                        { value: newValue },
                        { where: { codeId: entry.codeId } }
                    );
                    excessAmount = 0;
                }
            }
            console.log('Codelist entries adjusted successfully');
        } else if (newTotalCartons > currentCodeListTotal) {
            console.log('Product total increased - codelist total is still valid (can allocate more)');
            // No action needed - users can create more codelist entries up to the new total
        } else {
            console.log('Product total unchanged - no codelist adjustments needed');
        }
        
        console.log('Code list totals updated successfully');
    } catch (error) {
        console.error('Error updating code list totals:', error);
        throw error;
    }
};

// Helper function to update traceability totals and balance with smart logic
const updateTraceAbilityTotals = async (ItemId: number, newTotalCartons: number) => {
    try {
        console.log(`Updating traceability totals for ItemId: ${ItemId}, newTotalCartons: ${newTotalCartons}`);
        
        // Get traceability entries for this item, ordered by creation date (latest first)
        const traceAbilityEntries: any[] = await TraceAbilityModel.findAll({
            where: { ItemId: ItemId },
            order: [['createdAt', 'DESC']]
        });

        if (traceAbilityEntries.length === 0) {
            console.log('No traceability entries found for this item');
            return;
        }

        console.log(`Found ${traceAbilityEntries.length} traceability entries`);

        // Calculate total used quantity across all entries
        const totalUsedQuantity = traceAbilityEntries.reduce((sum, entry) => sum + (Number(entry.usedCase) || 0), 0);
        console.log(`Total used quantity: ${totalUsedQuantity}, New product total: ${newTotalCartons}`);

        // If new product total < total used quantity, reduce/delete latest used values
        if (newTotalCartons < totalUsedQuantity) {
            console.log('Product total < used quantity - reducing traceability used values');
            let excessUsed = totalUsedQuantity - newTotalCartons;
            console.log(`Need to reduce used quantity by: ${excessUsed}`);

            // Start from latest entries and reduce/delete usedCase until we match new total
            for (const entry of traceAbilityEntries) {
                if (excessUsed <= 0) break;

                const currentUsed = Number(entry.usedCase) || 0;
                const currentTotal = Number(entry.total) || 0;
                const traceAbilityId = entry.traceAbilityId;
                
                if (currentUsed <= excessUsed) {
                    // Set usedCase to 0 and recalculate balance
                    console.log(`Resetting usedCase for traceAbilityId ${traceAbilityId} from ${currentUsed} to 0`);
                    await TraceAbilityModel.update(
                        { 
                            usedCase: '0',
                            ballanceCase: currentTotal.toString()
                        },
                        { where: { traceAbilityId: traceAbilityId } }
                    );
                    excessUsed -= currentUsed;
                } else {
                    // Reduce usedCase value
                    const newUsed = currentUsed - excessUsed;
                    const newBalance = currentTotal - newUsed;
                    console.log(`Reducing usedCase for traceAbilityId ${traceAbilityId} from ${currentUsed} to ${newUsed}`);
                    await TraceAbilityModel.update(
                        { 
                            usedCase: newUsed.toString(),
                            ballanceCase: newBalance.toString()
                        },
                        { where: { traceAbilityId: traceAbilityId } }
                    );
                    excessUsed = 0;
                }
            }
            console.log('Traceability used values adjusted successfully');
        } else {
            // Update total and recalculate balance for all entries
            console.log('Updating totals and recalculating balances');
            for (const entry of traceAbilityEntries) {
                let usedCase = Number(entry.usedCase) || 0;
                const code = entry.code;
                const traceAbilityId = entry.traceAbilityId;
                
                // Ensure usedCase doesn't exceed newTotalCartons (balance >= 0)
                if (usedCase > newTotalCartons) {
                    console.log(`Code ${code}: usedCase ${usedCase} exceeds newTotal ${newTotalCartons}, capping to newTotal`);
                    usedCase = newTotalCartons; // Cap at max limit
                }
                
                const newBalance = newTotalCartons - usedCase;
                
                console.log(`Code ${code}: usedCase=${usedCase}, newTotal=${newTotalCartons}, newBalance=${newBalance}`);
                
                await TraceAbilityModel.update(
                    { 
                        total: newTotalCartons.toString(),
                        usedCase: usedCase.toString(),
                        ballanceCase: newBalance.toString()
                    },
                    { where: { traceAbilityId: traceAbilityId } }
                );
            }
        }
        
        console.log('Traceability totals updated successfully');
    } catch (error) {
        console.error('Error updating traceability totals:', error);
        throw error;
    }
};

// Helper function to update BAR entries based on available codelists
const updateBARTotals = async (ItemId: number, newTotalCartons: number) => {
    try {
        console.log(`Updating BAR entries for ItemId: ${ItemId}, newTotalCartons: ${newTotalCartons}`);
        
        // Get BAR entries for this item, ordered by creation date (latest first)
        const BAREntries: any[] = await sequelize.query(
            `SELECT * FROM tbl_bar WHERE ItemId = :ItemId ORDER BY createdAt DESC`,
            {
                replacements: { ItemId },
                type: QueryTypes.SELECT
            }
        );

        if (BAREntries.length === 0) {
            console.log('No BAR entries found for this item');
            return;
        }

        console.log(`Found ${BAREntries.length} BAR entries`);

        // Get current valid codes from codelist for this item
        const validCodes: any[] = await sequelize.query(
            `SELECT DISTINCT code FROM tbl_code_list WHERE ItemId = :ItemId`,
            {
                replacements: { ItemId },
                type: QueryTypes.SELECT
            }
        );

        const validCodeSet = new Set(validCodes.map(c => c.code));
        console.log(`Valid codes from codelist: ${Array.from(validCodeSet).join(', ')}`);

        // If product total is very low or no valid codes exist, delete BAR entries for invalid codes
        if (newTotalCartons === 0 || validCodeSet.size === 0) {
            console.log('Product total is 0 or no valid codes - deleting all BAR entries');
            await sequelize.query(
                `DELETE FROM tbl_bar WHERE ItemId = :ItemId`,
                {
                    replacements: { ItemId },
                    type: QueryTypes.DELETE
                }
            );
        } else {
            // Delete BAR entries with codes that no longer exist in codelist
            for (const entry of BAREntries) {
                if (!validCodeSet.has(entry.code)) {
                    console.log(`Deleting BAR entry BARId ${entry.BARId} with invalid code ${entry.code}`);
                    await sequelize.query(
                        `DELETE FROM tbl_bar WHERE BARId = :BARId`,
                        {
                            replacements: { BARId: entry.BARId },
                            type: QueryTypes.DELETE
                        }
                    );
                }
            }
        }
        
        console.log('BAR entries updated successfully');
    } catch (error) {
        console.error('Error updating BAR entries:', error);
        throw error;
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ItemId, details } = req.body;
        console.log(`=== UPDATING ITEM DETAILS ===`);
        console.log(`ItemId: ${ItemId}`);
        console.log(`Details:`, details);

        if (!ItemId || !Array.isArray(details)) {
            res.status(400).send({ error: 'Invalid input data' });
            return;
        }

        // Calculate new total cartons
        const newTotalCartons = details.reduce((sum: number, detail: any) => sum + (Number(detail.cartons) || 0), 0);
        console.log(`Calculated new total cartons: ${newTotalCartons}`);

        // Update item details
        console.log('Deleting existing item details...');
        await ItemDetailModel.destroy({ where: { ItemId: ItemId } });
        
        console.log('Creating new item details...');
        await Promise.all(details.map(async (detail) => {
            return await ItemDetailModel.create({
                ...detail,
                ItemId,
            });
        }));

        console.log('Item details updated successfully');

        // Cascade update: Update code list totals
        console.log('Starting cascade update for code list...');
        await updateCodeListTotals(ItemId, newTotalCartons);

        // Cascade update: Update traceability totals and balance
        console.log('Starting cascade update for traceability...');
        await updateTraceAbilityTotals(ItemId, newTotalCartons);

        // Cascade update: Update BAR entries
        console.log('Starting cascade update for BAR...');
        await updateBARTotals(ItemId, newTotalCartons);

        console.log('All cascade updates completed successfully');

        const results = await getItem(ItemId);
        res.status(200).send(results);
    } catch (e) {
        console.error('Error updating item details:', e);
        res.status(500).send({ 
            error: 'Failed to update item details', 
            details: e instanceof Error ? e.message : 'Unknown error' 
        });
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const deletedCount = await ItemDetailModel.destroy({ where: { ItemId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

const getItem = async (ItemId: any) => {
    const query = `
        SELECT 
        (SELECT prsg.PRSGDesc FROM tbl_prsg as prsg WHERE pid.PRSGId = prsg.PRSGId) as size,
        pid.PRSGId,
        pid.cartons,
        pid.kgQty,
        pid.usdRate,
        pid.usdAmount
        FROM 
        tbl_item_details AS pid
        WHERE pid.itemId = :ItemId
    `;

    const results = await sequelize.query(query, {
        replacements: { ItemId },
        type: QueryTypes.SELECT
    });

    return results;
}

const getItemByPIID = async (PIId: any) => {
    const query = `
        SELECT 
            ti.ItemId,
            pid.PRSGId,
            pid.cartons,
            pid.kgQty,
            pid.usdRate,
            pid.usdAmount,
            (SELECT prsg.PRSGDesc 
             FROM tbl_prsg AS prsg 
             WHERE pid.PRSGId = prsg.PRSGId) AS size
        FROM tbl_item_details AS pid
        INNER JOIN tbl_items AS ti ON ti.ItemId = pid.itemId
        WHERE ti.PIId = :PIId
    `;

    const results: any[] = await sequelize.query(query, {
        replacements: { PIId },
        type: QueryTypes.SELECT
    });

    // reshape to desired format
    const itemDetail = results.reduce((acc, row) => {
        let item = acc.find((i: any) => i.itemId === row.ItemId);
        const data = {
            PRSGId: row.PRSGId,
            cartons: row.cartons,
            kgQty: row.kgQty,
            size: row.size,
            usdAmount: row.usdAmount,
            usdRate: row.usdRate
        };
        if (item) {
            item.data.push(data);
        } else {
            acc.push({
                itemId: row.ItemId,
                data: [data]
            });
        }
        return acc;
    }, [] as any[]);

    return itemDetail;
};