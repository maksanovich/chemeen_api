import { Request, Response } from 'express';
import { TraceAbilityModel } from "../../models/product/traceAbility.model";
import { convertId } from '../../common/utils';
import sequelize from '../../config/sequelize';
import { QueryTypes } from 'sequelize';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type, PIId } = req.query;
    try {
        try {
            switch (type) {
                case 'traceAbility': {
                    const query = `
                        SELECT 
                        c.companyName as farmName, 
                        cl.code, 
                        SUM(cl.value) as totalCartons 
                        FROM tbl_code_list AS cl 
                        LEFT JOIN tbl_companies AS c 
                        ON c.companyId = cl.farmId
                        WHERE cl.PIId = :PIId 
                        GROUP BY code
                        `;

                    const results = await sequelize.query(query, {
                        replacements: { PIId },
                        type: QueryTypes.SELECT
                    });
                    res.status(200).send(results);
                } break;
                case 'formatted': {
                    const results = await getFormattedTraceAbilityData(PIId as string);
                    res.status(200).send(results);
                } break;
                default: {
                    const items = await TraceAbilityModel.findAll({ order: [['createdAt', 'DESC']] });
                    const result = convertId(items, 'traceAbilityId');
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
            res.status(404).send([]);
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

        // Validate required fields only (balance case is now user-controlled)
        const validationErrors: string[] = [];
        data.forEach((detail, index) => {
            if (!detail.productDate || !detail.rawMaterialQty || !detail.headlessQty) {
                validationErrors.push(
                    `Entry ${index + 1} (Code: ${detail.code}): Missing required fields (Production Date, Raw Material Qty, Headless Qty)`
                );
            }
        });

        if (validationErrors.length > 0) {
            res.status(400).send({ 
                error: 'Validation failed: Missing required fields',
                details: validationErrors 
            });
            return;
        }

        // Use user-provided balance case instead of calculating
        await Promise.all(data.map(async (detail) => {
            return await TraceAbilityModel.create({
                ...detail,
                PIId,
                ballanceCase: detail.ballanceCase || '0', // Use user input
            });
        }));

        const results = await getItem(PIId);
        res.status(200).send(results);
    } catch (e) {
        console.error('Error creating traceability:', e);
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

        // Validate required fields only (balance case is now user-controlled)
        const validationErrors: string[] = [];
        data.forEach((detail, index) => {
            if (!detail.productDate || !detail.rawMaterialQty || !detail.headlessQty) {
                validationErrors.push(
                    `Entry ${index + 1} (Code: ${detail.code}): Missing required fields (Production Date, Raw Material Qty, Headless Qty)`
                );
            }
        });

        if (validationErrors.length > 0) {
            res.status(400).send({ 
                error: 'Validation failed: Missing required fields',
                details: validationErrors 
            });
            return;
        }

        // Delete existing entries and create new ones with validated balances
        await TraceAbilityModel.destroy({ where: { PIId: PIId } });
        
        await Promise.all(data.map(async (detail) => {
            return await TraceAbilityModel.create({
                ...detail,
                PIId,
                ballanceCase: detail.ballanceCase || '0', // Use user input
            });
        }));

        const results = await getItem(PIId);
        res.status(200).send(results);
    } catch (e) {
        console.error('Error updating traceability:', e);
        res.status(500).send(e);
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const deletedCount = await TraceAbilityModel.destroy({ where: { PIId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


const getItem = async (PIId: any) => {
    const query = `
        SELECT
            ta.productDate,
            ta.rawMaterialQty,
            ta.headlessQty,
            ta.usedCase,
            ta.ballanceCase,
            ta.beforeDate,
            ta.code,
            ta.ItemId,
            MAX(prs.PRSName) AS PRSName,
            MAX(prst.PRSTName) AS PRSTName,
            c.companyName AS farmName
        FROM tbl_trace_ability AS ta
        LEFT JOIN tbl_code_list AS cl
            ON cl.code = ta.code
        LEFT JOIN tbl_companies AS c
            ON c.companyId = cl.farmId
        LEFT JOIN tbl_items AS item
            ON ta.ItemId = item.ItemId
        LEFT JOIN tbl_prs AS prs
            ON prs.PRSId = item.PRSId
        LEFT JOIN tbl_prst AS prst
            ON prst.PRSTId = item.PRSTId
        WHERE ta.PIId = :PIId
        GROUP BY ta.code, ta.ItemId
    `;
    const results = await sequelize.query(query, {
        replacements: { PIId },
        type: QueryTypes.SELECT
    });

    return results;
}

export const getFormattedTraceAbilityData = async (PIId: string) => {
    try {
        // Get code list data with product information
        const codeListQuery = `
            SELECT 
                cl.ItemId,
                cl.code,
                SUM(cl.value) as totalCartons,
                c.companyName as farmName,
                prs.PRSName,
                prst.PRSTName
            FROM tbl_code_list AS cl 
            LEFT JOIN tbl_companies AS c ON c.companyId = cl.farmId
            LEFT JOIN tbl_items AS item ON item.ItemId = cl.ItemId
            LEFT JOIN tbl_prs AS prs ON prs.PRSId = item.PRSId
            LEFT JOIN tbl_prst AS prst ON prst.PRSTId = item.PRSTId
            WHERE cl.PIId = :PIId 
            GROUP BY cl.ItemId, cl.code, c.companyName, prs.PRSName, prst.PRSTName
        `;

        const codeListData = await sequelize.query(codeListQuery, {
            replacements: { PIId },
            type: QueryTypes.SELECT
        });

        // Get existing traceability data
        const traceAbilityQuery = `
            SELECT 
                ItemId,
                productDate,
                rawMaterialQty,
                headlessQty,
                usedCase,
                ballanceCase,
                beforeDate
            FROM tbl_trace_ability 
            WHERE PIId = :PIId
        `;

        const traceAbilityData = await sequelize.query(traceAbilityQuery, {
            replacements: { PIId },
            type: QueryTypes.SELECT
        });

        // Create a map of existing traceability data by ItemId
        const traceAbilityMap = new Map(
            traceAbilityData.map((item: any) => [item.ItemId, item])
        );

        // Format the data combining code list and traceability data
        const formattedData = codeListData.map((item: any) => {
            const existing = traceAbilityMap.get(item.ItemId);
            const total = parseFloat(item.totalCartons) || 0;
            const usedCase = parseFloat(existing?.usedCase || "0");
            const balanceCase = existing ? parseFloat(existing.ballanceCase || "0") : ""; // Use actual balance from database or blank

            return {
                ItemId: item.ItemId,
                code: item.code,
                farmName: item.farmName,
                totalCartons: item.totalCartons,
                PRSName: item.PRSName,
                PRSTName: item.PRSTName,
                productCode: `${item.PRSName} ${item.PRSTName}`,
                total: total.toString(),
                productDate: existing?.productDate || "",
                rawMaterialQty: existing?.rawMaterialQty || "0",
                headlessQty: existing?.headlessQty || "0",
                usedCase: existing?.usedCase || "0",
                ballanceCase: balanceCase === "" ? "" : balanceCase.toString(), // Use actual balance or blank
                beforeDate: existing?.beforeDate || "",
            };
        });

        return formattedData;
    } catch (error) {
        console.error('Error in getFormattedTraceAbilityData:', error);
        throw error;
    }
}