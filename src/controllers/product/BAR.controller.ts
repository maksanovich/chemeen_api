import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../../config/sequelize';
import { convertId } from '../../common/utils';
import { BARModel } from "../../models/product/BAR.model";

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { PIId } = req.query;
    try {
        try {
            const items = await BARModel.findAll({ order: [['createdAt', 'DESC']] });
            const result = convertId(items, 'BARId');
            res.status(200).send(result);
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
                if (detail.BARId === '') {
                    delete detail.BARId;
                }
                
                return await BARModel.create({
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
            return;
        }

        await Promise.all(data.map(async (detail) => {
            const { BARId, ...rest } = detail;

            if (BARId) {
                const [updatedRows] = await BARModel.update(
                    { ...rest, PIId },
                    { where: { BARId } }
                );

                if (updatedRows === 0) {
                    await BARModel.create({ ...detail, PIId });
                }
            } else {
                if (detail.BARId === '') {
                    delete detail.BARId;
                }
                await BARModel.create({ ...detail, PIId });
            }
        }));

        const results = await getItem(PIId);
        res.status(200).send(results);

    } catch (e) {
        res.status(500).send(e);
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        // Delete by PIId (all items for a PI)
        const deletedCount = await BARModel.destroy({ where: { PIId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send({ error: 'No BAR items found for this PI' });
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const removeItem = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        // Delete by BARId (individual item)
        const deletedCount = await BARModel.destroy({ where: { BARId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send({ error: 'BAR item not found' });
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


const getItem = async (PIId: any) => {
    const query = `
        SELECT * FROM tbl_bar where PIId = :PIId
    `;
    const results = await sequelize.query(query, {
        replacements: { PIId },
        type: QueryTypes.SELECT
    });

    return results;
}