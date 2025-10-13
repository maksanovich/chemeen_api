import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../../config/sequelize';
import { ElisaModel } from "../../models/product/Elisa.model";
import { IElisa } from "../../config/productInterfaces";

import { convertId } from '../../common/utils';
import { ElisaDetailModel } from '../../models/product/ElisaDetail.model';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await getItems('');
        res.status(200).send(items);
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
            res.status(200).send({});
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { PIId, data } = req.body;
        if (!PIId || typeof data !== 'object' || Array.isArray(data)) {
            res.status(400).send({ error: 'Invalid input data' });
            return;
        }

        const newItem = await ElisaModel.create({
            ...data,
            PIId,
        });

        res.status(200).send(newItem);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};


export const update = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id; // elisaId
    try {
        const { PIId, data } = req.body;

        const existingItem = await ElisaModel.findOne({
            where: { PIId, elisaId: id }
        });

        if (existingItem) {
            await ElisaModel.update(data, {
                where: { PIId, elisaId: id }
            });
            data.PIId = PIId;
            res.status(200).json(data);
        } else {
            const newItem = await ElisaModel.create(data);
            data.PIId = PIId;
            res.status(201).json(data);
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
    const id: string = req.params.id;
    try {
        const deletedCount = await ElisaModel.destroy({ where: { elisaId: id } });
        const response = await ElisaDetailModel.destroy({ where: { elisaId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

const getItems = async (id: string) => {
    const query = `
            SELECT * FROM tbl_elisa WHERE PIId = :id
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