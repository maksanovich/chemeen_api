import { Request, Response } from 'express';
import { ElisaDetailModel } from "../../models/product/ElisaDetail.model";
import { convertId } from '../../common/utils';
import sequelize from '../../config/sequelize';
import { QueryTypes } from 'sequelize';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type, PIId } = req.query;
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
                const items = await ElisaDetailModel.findAll({ order: [['createdAt', 'DESC']] });
                const result = convertId(items, 'traceAbilityId');
                res.status(200).send(result);
            }
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
                return await ElisaDetailModel.create({
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
    const id: string = req.params.id;
    try {
        const { PIId, data } = req.body;
        if (!PIId || !Array.isArray(data)) {
            res.status(400).send({ error: 'Invalid input data' });
        } else {

            await ElisaDetailModel.destroy({ where: { PIId: PIId, elisaId: id } });
            await Promise.all(data.map(async (detail) => {
                return await ElisaDetailModel.create({
                    ...detail,
                    PIId,
                    elisaId: id
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
        const deletedCount = await ElisaDetailModel.destroy({ where: { PIId: id } });
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
        ed.*, test.testDesc as testName
        FROM tbl_elisa_detail as ed
        LEft join tbl_test as test 
        on test.testId = ed.testId
        WHERE PIId = :PIId
    `;
    const results = await sequelize.query(query, {
        replacements: { PIId },
        type: QueryTypes.SELECT
    });

    return results;
}