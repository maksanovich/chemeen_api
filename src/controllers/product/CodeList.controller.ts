import { Request, Response } from 'express';
import { QueryTypes, Op } from 'sequelize';

import sequelize from '../../config/sequelize';
import { convertId } from '../../common/utils';
import { CodeListModel } from "../../models/product/codeList.model";
import { TraceAbilityModel } from "../../models/product/traceAbility.model";
import { BARModel } from "../../models/product/BAR.model";
import { ItemDetailModel } from "../../models/product/itemDetail.model";

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type, PIId } = req.query;
    try {
        try {
            switch (type) {
                case 'traceAbility': {
                    const query = `
                        SELECT 
                            c.companyName AS farmName, 
                            cl.code, 
                            cl.ItemId,
                            MAX(item.PRSId) AS PRSId,
                            MAX(item.PRSTId) AS PRSTId,
                            MAX(prs.PRSName) AS PRSName,
                            MAX(prst.PRSTName) AS PRSTName,
                            SUM(cl.value) AS totalCartons
                        FROM tbl_code_list AS cl
                        LEFT JOIN tbl_companies AS c 
                            ON c.companyId = cl.farmId
                        LEFT JOIN tbl_items AS item
                            ON cl.ItemId = item.ItemId
                        LEFT JOIN tbl_prs AS prs
                            ON prs.PRSId = item.PRSId
                        LEFT JOIN tbl_prst AS prst
                            ON prst.PRSTId = item.PRSTId
                        WHERE cl.PIId = :PIId
                        GROUP BY cl.ItemId, cl.code, c.companyName
                        ORDER BY cl.code;
                        `;

                    const results = await sequelize.query(query, {
                        replacements: { PIId },
                        type: QueryTypes.SELECT
                    });
                    res.status(200).send(results);
                } break;
                case 'BAR': {
                    const query = `
                        SELECT 
                            cl.codeId,
                            cl.ItemId,
                            cl.code,
                            prs.PRSName,
                            prst.PRSTName
                        FROM tbl_code_list AS cl
                        LEFT JOIN tbl_items AS item
                            ON cl.ItemId = item.ItemId
                        LEFT JOIN tbl_prs AS prs
                            ON prs.PRSId = item.PRSId
                        LEFT JOIN tbl_prst AS prst
                            ON prst.PRSTId = item.PRSTId
                        WHERE cl.PIId = :PIId
                        GROUP BY cl.ItemId, cl.code
                        `;

                    const results = await sequelize.query(query, {
                        replacements: { PIId },
                        type: QueryTypes.SELECT
                    });
                    res.status(200).send(results);
                } break;
                default: {
                    const items = await CodeListModel.findAll({ order: [['createdAt', 'DESC']] });
                    const result = convertId(items, 'codeId');
                    res.status(200).send(result);
                }
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
            res.status(200).send([]);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { PIId, data } = req.body;
        if (!PIId || !Array.isArray(data)) {
            res.status(400).send({ error: 'Invalid input data' });
            return;
        }

        // Use a transaction for consistency
        await sequelize.transaction(async (t) => {
            // Validate each detail before creating
            await Promise.all(
                data.map(async (detail) => {
                    const { ItemId, PRSGId, value } = detail;
                    
                    // Validate the value before creating
                    if (ItemId && PRSGId && value !== undefined) {
                        await validateValueUpdate(ItemId, PRSGId, Number(value), null, t);
                    }
                    
                    return await CodeListModel.create({
                        ...detail,
                        PIId,
                    }, { transaction: t });
                })
            );
        });

        res.status(200).send({ message: 'Product code created' });
    } catch (e) {
        console.log(JSON.stringify(e), 'error');
        
        // Check if it's a validation error and format it properly
        if (e instanceof Error && e.message.includes('Cannot create code list entry')) {
            res.status(400).send({ 
                error: 'Validation Error',
                details: e.message,
                message: e.message
            });
        } else {
            res.status(500).send({ 
                error: 'Internal Server Error',
                details: e instanceof Error ? e.message : 'An unexpected error occurred',
                message: 'Failed to create code list item'
            });
        }
    }
};

// Helper function to validate if the new value is within allowed limits
const validateValueUpdate = async (ItemId: number, PRSGId: number, newValue: number, codeId: number | null, transaction: any) => {
    try {
        // Get the cartons value from tbl_item_details for the specific ItemId and PRSGId
        const itemDetail = await ItemDetailModel.findOne({
            where: { ItemId, PRSGId },
            transaction
        });

        if (!itemDetail) {
            throw new Error(`Item detail not found for ItemId: ${ItemId}, PRSGId: ${PRSGId}`);
        }

        const maxCartons = Number((itemDetail as any).cartons) || 0;
        
        // Get the grade description
        const gradeQuery = `
            SELECT PRSGDesc FROM tbl_prsg WHERE PRSGId = :PRSGId
        `;
        const gradeResult: any[] = await sequelize.query(gradeQuery, {
            replacements: { PRSGId },
            type: QueryTypes.SELECT,
            transaction
        });
        const gradeDesc = gradeResult.length > 0 ? gradeResult[0].PRSGDesc : `Grade ${PRSGId}`;
        
        // Get all current code list entries for this ItemId and PRSGId
        const currentEntries = await CodeListModel.findAll({
            where: { ItemId, PRSGId },
            transaction
        });

        // Calculate current total value for this ItemId and PRSGId
        let currentTotal = currentEntries.reduce((sum, entry) => sum + (Number((entry as any).value) || 0), 0);
        
        // If we're updating an existing record, subtract its current value from the total
        if (codeId) {
            const existingEntry = currentEntries.find(entry => (entry as any).codeId === codeId);
            if (existingEntry) {
                currentTotal -= Number((existingEntry as any).value) || 0;
            }
        }
        
        // Add the new value to get the new total
        const newTotal = currentTotal + newValue;
        
        if (newTotal > maxCartons) {
            const operation = codeId ? 'update' : 'create';
            throw new Error(`Cannot ${operation} code list entry. Total allocated quantity (${newTotal} cartons) exceeds customer requirement (${maxCartons} cartons) for grade "${gradeDesc}". Please reduce allocated quantities.`);
        }

        return true;
    } catch (error) {
        console.error('Validation error:', error);
        throw error;
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { PIId, data } = req.body;
        if (!PIId || !Array.isArray(data)) {
            res.status(400).send({ error: 'Invalid input data' });
            return;
        }

        // Use a transaction for consistency
        await sequelize.transaction(async (t) => {
            // 1) Validate and update or create each detail row using codeId when available
            await Promise.all(
                data.map(async (detail) => {
                    const { codeId, ItemId, PRSGId, value } = detail;
                    
                    // Validate the value update before proceeding
                    if (ItemId && PRSGId && value !== undefined) {
                        await validateValueUpdate(ItemId, PRSGId, Number(value), codeId, t);
                    }
                    
                    if (codeId) {
                        // If codeId is provided, update by codeId for precise targeting
                        const existing = await CodeListModel.findOne({
                            where: { codeId },
                            transaction: t,
                        });
                        if (existing) {
                            await existing.update(detail, { transaction: t });
                        } else {
                            // codeId doesn't exist, create new record
                            await CodeListModel.create({ ...detail, PIId }, { transaction: t });
                        }
                    } else {
                        // Fallback to old behavior if codeId is not provided
                        const existing = await CodeListModel.findOne({
                            where: { PIId, ItemId, PRSGId },
                            transaction: t,
                        });
                        if (existing) {
                            await existing.update(detail, { transaction: t });
                        } else {
                            await CodeListModel.create({ ...detail, PIId }, { transaction: t });
                        }
                    }
                })
            );

            // 2) After upsert, ensure dependent tables' codes match CodeList by PIId+ItemId
            const rows: any[] = await sequelize.query(
                `SELECT ItemId, MAX(code) as code FROM tbl_code_list WHERE PIId = :PIId GROUP BY ItemId`,
                { replacements: { PIId }, type: QueryTypes.SELECT, transaction: t as any }
            );

            await Promise.all(rows.map(async (row: any) => {
                const itemId = row.ItemId;
                const newCode = row.code;
                // Update only rows where code differs for this PIId+ItemId
                await Promise.all([
                    TraceAbilityModel.update(
                        { code: newCode },
                        { where: { PIId, ItemId: itemId, code: { [Op.ne]: newCode } }, transaction: t }
                    ),
                    BARModel.update(
                        { code: newCode },
                        { where: { PIId, ItemId: itemId, code: { [Op.ne]: newCode } }, transaction: t }
                    )
                ]);
            }));
        });

        const results = await getItem(PIId);
        res.status(200).send(results);
    } catch (e) {
        console.log(JSON.stringify(e), 'error');
        
        // Check if it's a validation error and format it properly
        if (e instanceof Error && e.message.includes('Cannot update code list entry')) {
            res.status(400).send({ 
                error: 'Validation Error',
                details: e.message,
                message: e.message
            });
        } else {
            res.status(500).send({ 
                error: 'Internal Server Error',
                details: e instanceof Error ? e.message : 'An unexpected error occurred',
                message: 'Failed to update code list item'
            });
        }
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // PIId or codeId
    const { itemId, code, codeId } = req.query;

    try {
        let deletedCount = 0;

        if (codeId) {
            // If codeId is provided, delete by codeId for precise targeting
            deletedCount = await CodeListModel.destroy({
                where: { codeId },
            });
        } else {
            // Fallback to old behavior using PIId and optional filters
            deletedCount = await CodeListModel.destroy({
                where: {
                    PIId: id,
                    ...(itemId ? { ItemId: itemId } : {}),
                    ...(code ? { code } : {}),
                },
            });
        }

        if (deletedCount > 0) {
            res.status(200).send({ message: "Deleted successfully" });
        } else {
            res.status(404).send({ error: "No record found" });
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const findByPIId = async (req: Request, res: Response): Promise<void> => {
    const { PIId } = req.params;
    
    try {
        if (!PIId) {
            res.status(400).send({ error: 'PIId parameter is required' });
            return;
        }

        const results = await getItem(PIId);
        const groupedResults = groupCodeListByItemId(results);
        res.status(200).send(groupedResults);
    } catch (e) {
        console.log(JSON.stringify(e), 'error');
        res.status(500).send(e);
    }
};

export const checkCode = async (req: Request, res: Response): Promise<void> => {
    const { PIId, code } = req.params;
    const { excludeId } = req.query;
    
    try {
        if (!PIId || !code) {
            res.status(400).send({ error: 'PIId and code parameters are required' });
            return;
        }

        // Build the where clause
        const whereClause: any = {
            PIId: PIId,
            code: code.trim()
        };

        // If excludeId is provided, we need to exclude all codeIds that belong to the same codelist item
        if (excludeId) {
            // First, find the codelist item that contains the excludeId
            const excludeItem = await CodeListModel.findOne({
                where: { codeId: excludeId },
                attributes: ['ItemId', 'code', 'farmId']
            });

            if (excludeItem) {
                // Find all codeIds that belong to the same codelist item (same ItemId, code, farmId)
                const sameCodeListItems = await CodeListModel.findAll({
                    where: {
                        ItemId: (excludeItem as any).ItemId,
                        code: (excludeItem as any).code,
                        farmId: (excludeItem as any).farmId
                    },
                    attributes: ['codeId']
                });

                // Exclude all these codeIds from the duplicate check
                const excludeCodeIds = sameCodeListItems.map(item => (item as any).codeId);
                whereClause.codeId = { [Op.notIn]: excludeCodeIds };
                
                // Also add the ItemId and farmId to the where clause to only check within the same item and farm
                whereClause.ItemId = (excludeItem as any).ItemId;
                whereClause.farmId = (excludeItem as any).farmId;
            } else {
                // Fallback: if excludeId doesn't exist, exclude just that specific codeId
                whereClause.codeId = { [Op.ne]: excludeId };
            }
        }

        const existingCode = await CodeListModel.findOne({
            where: whereClause
        });

        res.status(200).send({ 
            exists: !!existingCode,
            message: existingCode ? 'Code already exists' : 'Code is available'
        });
    } catch (e) {
        console.log(JSON.stringify(e), 'error');
        res.status(500).send(e);
    }
};


const getItem = async (PIId: any) => {
    const query = `
        SELECT 
            cl.codeId,
            cl.code,
            cl.farmId,
            cl.ItemId,
            c.companyName as farmName,
            cl.PRSGId,
            pg.PRSGDesc,
            cl.value,
            prs.PRSName,
            prst.PRSTName
        FROM 
            tbl_code_list as cl 
        LEFT JOIN 
            tbl_companies as c 
            ON cl.farmId = c.companyId
        LEFT JOIN 
            tbl_prsg as pg 
            ON cl.PRSGId = pg.PRSGId
        LEFT JOIN 
            tbl_items as item
            ON cl.ItemId = item.ItemId
        LEFT JOIN 
            tbl_prs as prs
            ON item.PRSId = prs.PRSId
        LEFT JOIN 
            tbl_prst as prst
            ON item.PRSTId = prst.PRSTId
        WHERE cl.PIId = :PIId
        ORDER BY 
            cl.createdAt;  
    `;

    const results = await sequelize.query(query, {
        replacements: { PIId },
        type: QueryTypes.SELECT
    });

    return results;
}

const groupCodeListByItemId = (codeList: any[]) => {
    const grouped: { [key: string]: any } = {};

    codeList.forEach((item) => {
        const key = `${item.ItemId}_${item.code}_${item.farmId}`;

        if (!grouped[key]) {
            grouped[key] = {
                ItemId: item.ItemId,
                productCode: item.ItemId, // Use ItemId as productCode to match ThemedPicker value
                productName: `${item.PRSName || ''} ${item.PRSTName || ''}`.trim(), // Keep the name for display
                code: item.code,
                farmId: item.farmId,
                farmName: item.farmName,
                total: 0,
                grades: []
            };
        }

        grouped[key].grades.push({
            codeId: item.codeId,
            PRSGId: item.PRSGId,
            PRSGDesc: item.PRSGDesc,
            value: item.value
        });

        grouped[key].total += item.value;
    });

    return Object.values(grouped);
}