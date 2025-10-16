import { Request, Response } from 'express';
import { QueryTypes, Op } from 'sequelize';

import sequelize from '../../config/sequelize';
import { ItemModel } from '../../models/product/item.model';
import { IElisa } from "../../config/productInterfaces";

import { convertId } from '../../common/utils';
import { ItemDetailModel } from '../../models/product/itemDetail.model';
import { CodeListModel } from '../../models/product/codeList.model';
import { BARModel } from '../../models/product/BAR.model';
import { TraceAbilityModel } from '../../models/product/traceAbility.model';
import { ElisaModel } from '../../models/product/Elisa.model';
import { ElisaDetailModel } from '../../models/product/ElisaDetail.model';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type, ItemId }: any = req.query;
    
    try {
        switch (type) {
            case 'name': {
                const result = await getItemsByItemID(ItemId);
                res.status(200).send(result[0]);
            } break;
            default: {
                const items = await getItems('');
                res.status(200).send(items);
            }
        }

    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const results = await getItems(id);
        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(200).send([]);
        }
    } catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
};

export const findByPIId = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const results = await getItems(id);
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
        const { PIId, data } = req.body;
        
        if (!PIId || typeof data !== 'object' || Array.isArray(data)) {
            res.status(400).send({ error: 'Invalid input data' });
            return;
        }

        const newItem: any = await ItemModel.create({
            ...data,
            PIId,
        });
        const results = await getItemsByItemID(newItem.ItemId);
        res.status(200).send(results[0]);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    // const id: string = req.params.id;
    try {
        // const itemUpdate = req.body;
        // Review the values of ItemId and data from the request body
        console.log('ItemId:', req.body.ItemId);
        console.log('data:', req.body.data);
        const { ItemId, data } = req.body;
        const existingItem = await ItemModel.findOne({ where: { ItemId: ItemId } });;
        if (existingItem) {
            await ItemModel.update(data, { where: { ItemId: ItemId } });
            const results = await getItemsByItemID(ItemId);
            res.status(200).json(results[0]);
        } else {
            const newItem = await ItemModel.create(data);
            const results = await getItemsByItemID(newItem.dataValues.ItemId);
            res.status(201).json(results[0]);
        }
    } catch (e: any) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'already exists' });
        } else {
            res.status(500).send(e);
        }
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        console.log(`Starting deletion process for ItemId: ${id}`);
        
        // First, get all ELISA IDs associated with this item
        let elisaIds: any[] = [];
        try {
            const elisaItems = await ElisaModel.findAll({ 
                where: { ItemId: id },
                attributes: ['elisaId']
            });
            
            // Ensure elisaItems is an array and not null/undefined
            if (Array.isArray(elisaItems)) {
                elisaIds = elisaItems.map((item: any) => item.elisaId).filter(id => id != null);
                console.log(`Found ${elisaIds.length} ELISA IDs:`, elisaIds);
            } else {
                console.log('No ELISA items found or query returned non-array result');
            }
        } catch (elisaError) {
            console.error('Error fetching ELISA items:', elisaError);
            // Continue with deletion even if ELISA fetch fails
        }

        // Remove related records in associated tables
        console.log('Deleting related records...');
        await Promise.all([
            CodeListModel.destroy({ where: { ItemId: id } }),
            BARModel.destroy({ where: { ItemId: id } }),
            TraceAbilityModel.destroy({ where: { ItemId: id } }),
            // Delete ELISA details first (child records) - only if we have ELISA IDs
            ...(elisaIds.length > 0 ? [ElisaDetailModel.destroy({ where: { elisaId: { [Op.in]: elisaIds } } })] : []),
            // Then delete ELISA records (parent records)
            ElisaModel.destroy({ where: { ItemId: id } }),
            ItemDetailModel.destroy({ where: { ItemId: id } }),
        ]);

        console.log('Related records deleted successfully');

        // Remove the main item
        console.log('Deleting main item...');
        const deletedCount = await ItemModel.destroy({ where: { ItemId: id } });

        if (deletedCount > 0) {
            console.log('Item deleted successfully');
            res.sendStatus(204);
        } else {
            console.log('Item not found');
            res.status(404).send({ message: "Item not found" });
        }
    } catch (error) {
        console.error('Error during item deletion:', error);
        res.status(500).send({ 
            error: 'Failed to delete item', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
};

const getItems = async (id: string) => {
    const query = `
            SELECT 
                item.*, 
                prs.PRSName,
                prst.PRSTName
            FROM tbl_items AS item
            LEFT JOIN tbl_prs AS prs
                ON prs.PRSId = item.PRSId
            LEFT JOIN tbl_prst AS prst
                ON prst.PRSTId = item.PRSTId
            WHERE item.PIId = :id;
        `;

    if (id != '') {
        const results = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT
        });
        return results;
    } else {
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return results;
    }
}

const getItemsByItemID = async (id: string) => {
    const query = `
            SELECT 
                item.*, 
                prs.PRSName,
                prst.PRSTName
            FROM tbl_items AS item
            LEFT JOIN tbl_prs AS prs
                ON prs.PRSId = item.PRSId
            LEFT JOIN tbl_prst AS prst
                ON prst.PRSTId = item.PRSTId
            WHERE item.ItemId = :id;
        `;

    if (id != '') {
        const results = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT
        });
        return results;
    } else {
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return results;
    }
}

export const getMergedDataByPIId = async (req: Request, res: Response): Promise<void> => {
    const PIId: string = req.params.PIId;
    try {
        const results = await getMergedItemsWithDetails(PIId);
        res.status(200).send(results);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

export const getItemWithDetails = async (req: Request, res: Response): Promise<void> => {
    const { PIId, ItemId } = req.params;
    try {
        const results = await getItemAndDetailsByPIIdAndItemId(PIId, ItemId);
        if (results) {
            res.status(200).send(results);
        } else {
            res.status(404).send({ message: "Item not found" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

const getMergedItemsWithDetails = async (PIId: string) => {
    // Get items with PRS and PRST names
    const itemsQuery = `
        SELECT 
            item.ItemId,
            item.PRSId,
            item.PRSTId,
            prs.PRSName,
            prst.PRSTName
        FROM tbl_items AS item
        LEFT JOIN tbl_prs AS prs
            ON prs.PRSId = item.PRSId
        LEFT JOIN tbl_prst AS prst
            ON prst.PRSTId = item.PRSTId
        WHERE item.PIId = :PIId;
    `;

    // Get item details grouped by ItemId
    const detailsQuery = `
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

    const [items, details] = await Promise.all([
        sequelize.query(itemsQuery, {
            replacements: { PIId },
            type: QueryTypes.SELECT
        }),
        sequelize.query(detailsQuery, {
            replacements: { PIId },
            type: QueryTypes.SELECT
        })
    ]);

    // Group details by ItemId
    const detailsByItemId = (details as any[]).reduce((acc, detail) => {
        if (!acc[detail.ItemId]) {
            acc[detail.ItemId] = [];
        }
        acc[detail.ItemId].push({
            PRSGId: detail.PRSGId,
            cartons: detail.cartons,
            kgQty: detail.kgQty,
            size: detail.size,
            usdAmount: detail.usdAmount,
            usdRate: detail.usdRate
        });
        return acc;
    }, {} as any);

    // Merge items with their details and calculate totals
    const merged = (items as any[]).map((item) => {
        const itemDetails = detailsByItemId[item.ItemId] || [];
        
        const totalCarton = itemDetails.reduce((sum: number, d: any) => sum + Number(d.cartons || 0), 0);
        const totalKgQty = itemDetails.reduce((sum: number, d: any) => sum + Number(d.kgQty || 0), 0);
        const totalAmount = itemDetails.reduce((sum: number, d: any) => sum + Number(d.usdAmount || 0), 0);

        return {
            ItemId: item.ItemId,
            productCode: `${item.PRSName}-${item.PRSTName}`,
            totalCarton: totalCarton.toString(),
            totalKgQty: totalKgQty.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
        };
    });

    return merged;
}

const getItemAndDetailsByPIIdAndItemId = async (PIId: string, ItemId: string) => {
    // Get item data
    const itemQuery = `
        SELECT 
            item.ItemId,
            item.marksNo,
            item.PRFId,
            item.PRSId,
            item.PRSTId,
            item.PRSPId,
            item.PRSVId,
            item.PRSPSId
        FROM tbl_items AS item
        WHERE item.PIId = :PIId AND item.ItemId = :ItemId;
    `;

    // Get item details
    const detailsQuery = `
        SELECT 
            pid.PRSGId,
            pid.cartons,
            pid.kgQty,
            pid.usdRate,
            pid.usdAmount,
            (SELECT prsg.PRSGDesc 
             FROM tbl_prsg AS prsg 
             WHERE pid.PRSGId = prsg.PRSGId) AS size
        FROM tbl_item_details AS pid
        WHERE pid.ItemId = :ItemId
    `;

    const [itemResult, detailsResult] = await Promise.all([
        sequelize.query(itemQuery, {
            replacements: { PIId, ItemId },
            type: QueryTypes.SELECT
        }),
        sequelize.query(detailsQuery, {
            replacements: { ItemId },
            type: QueryTypes.SELECT
        })
    ]);

    if (itemResult.length === 0) {
        return null;
    }

    const item = itemResult[0] as any;
    const details = (detailsResult as any[]).map(detail => ({
        PRSGId: detail.PRSGId.toString(),
        size: detail.size,
        cartons: detail.cartons,
        kgQty: detail.kgQty,
        usdRate: detail.usdRate,
        usdAmount: detail.usdAmount
    }));

    return {
        item: {
            ItemId: ItemId || 0,
            marksNo: item.marksNo || '',
            PRFId: item.PRFId || 0,
            PRSId: item.PRSId || 0,
            PRSTId: item.PRSTId || 0,
            PRSPId: item.PRSPId || 0,
            PRSVId: item.PRSVId || 0,
            PRSPSId: item.PRSPSId || 0,
        },
        details: details
    };
}