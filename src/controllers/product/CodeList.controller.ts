import { Request, Response } from 'express';
import { QueryTypes, Op } from 'sequelize';

import sequelize from '../../config/sequelize';
import { convertId } from '../../common/utils';
import { CodeListModel } from "../../models/product/codeList.model";
import { TraceAbilityModel } from "../../models/product/traceAbility.model";
import { BARModel } from "../../models/product/BAR.model";

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
        } else {
            await Promise.all(data.map(async (detail) => {
                return await CodeListModel.create({
                    ...detail,
                    PIId,
                });
            }));
            res.status(200).send({ message: 'Product code created' });
        }

    } catch (e) {
        console.log(JSON.stringify(e), 'error');
        res.status(500).send(e);
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
            // 1) Update or create each detail row using codeId when available
            await Promise.all(
                data.map(async (detail) => {
                    const { codeId, ItemId, PRSGId } = detail;
                    
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
        res.status(500).send(e);
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