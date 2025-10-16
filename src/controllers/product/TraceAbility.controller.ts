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
        } else {
            await Promise.all(data.map(async (detail) => {
                return await TraceAbilityModel.create({
                    ...detail,
                    PIId,
                });
            }));
            const results = await getItem(PIId);
            res.status(200).send(results);
        }

    } catch (e) {
        res.status(500).send(e);
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { PIId, data } = req.body;
        if (!PIId || !Array.isArray(data)) {
            res.status(400).send({ error: 'Invalid input data' });
        } else {

            await TraceAbilityModel.destroy({ where: { PIId: PIId } });
            await Promise.all(data.map(async (detail) => {
                return await TraceAbilityModel.create({
                    ...detail,
                    PIId,
                });
            }));
            const results = await getItem(PIId);
            res.status(200).send(results);
        }
    } catch (e) {
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