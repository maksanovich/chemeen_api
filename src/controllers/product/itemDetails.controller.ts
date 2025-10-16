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

// Helper function to update code list totals
const updateCodeListTotals = async (ItemId: number, newTotalCartons: number) => {
    try {
        console.log(`Updating code list totals for ItemId: ${ItemId}, newTotalCartons: ${newTotalCartons}`);
        
        // Get all code list entries for this item
        const codeListEntries = await CodeListModel.findAll({
            where: { ItemId: ItemId },
            attributes: ['code', 'farmId', 'value']
        });

        if (codeListEntries.length === 0) {
            console.log('No code list entries found for this item');
            return;
        }

        // Group by code and farmId to calculate totals
        const groupedCodes = codeListEntries.reduce((acc: any, entry: any) => {
            const key = `${entry.code}_${entry.farmId}`;
            if (!acc[key]) {
                acc[key] = {
                    code: entry.code,
                    farmId: entry.farmId,
                    totalValue: 0,
                    entries: []
                };
            }
            acc[key].totalValue += Number(entry.value) || 0;
            acc[key].entries.push(entry);
            return acc;
        }, {});

        console.log(`Found ${Object.keys(groupedCodes).length} code groups`);

        // Update each group's total value to match new total cartons
        for (const key in groupedCodes) {
            const group = groupedCodes[key];
            
            if (group.totalValue === 0) {
                console.log(`Skipping group ${key} - totalValue is 0`);
                continue;
            }
            
            const ratio = newTotalCartons / group.totalValue;
            console.log(`Group ${key}: oldTotal=${group.totalValue}, newTotal=${newTotalCartons}, ratio=${ratio}`);
            
            // Update all entries in this group proportionally
            const updateResult = await CodeListModel.update(
                { value: sequelize.literal(`value * ${ratio}`) },
                { 
                    where: { 
                        ItemId: ItemId,
                        code: group.code,
                        farmId: group.farmId
                    } 
                }
            );
            
            console.log(`Updated ${updateResult[0]} code list entries for group ${key}`);
        }
        
        console.log('Code list totals updated successfully');
    } catch (error) {
        console.error('Error updating code list totals:', error);
        throw error; // Re-throw to be caught by parent function
    }
};

// Helper function to update traceability totals and balance
const updateTraceAbilityTotals = async (ItemId: number, newTotalCartons: number) => {
    try {
        console.log(`Updating traceability totals for ItemId: ${ItemId}, newTotalCartons: ${newTotalCartons}`);
        
        // Get traceability entries for this item
        const traceAbilityEntries = await TraceAbilityModel.findAll({
            where: { ItemId: ItemId }
        });

        if (traceAbilityEntries.length === 0) {
            console.log('No traceability entries found for this item');
            return;
        }

        console.log(`Found ${traceAbilityEntries.length} traceability entries`);

        for (const entry of traceAbilityEntries) {
            const currentTotal = Number((entry as any).total) || 0;
            const usedCase = Number((entry as any).usedCase) || 0;
            const code = (entry as any).code;
            
            // Update total to new total cartons
            const newBalance = newTotalCartons - usedCase;
            
            console.log(`Code ${code}: oldTotal=${currentTotal}, usedCase=${usedCase}, newTotal=${newTotalCartons}, newBalance=${newBalance}`);
            
            const updateResult = await TraceAbilityModel.update(
                { 
                    total: newTotalCartons.toString(),
                    ballanceCase: newBalance.toString()
                },
                { where: { ItemId: ItemId, code: code } }
            );
            
            console.log(`Updated ${updateResult[0]} traceability entry for code ${code}`);
        }
        
        console.log('Traceability totals updated successfully');
    } catch (error) {
        console.error('Error updating traceability totals:', error);
        throw error; // Re-throw to be caught by parent function
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