import { Request, Response } from 'express';
import { PRSPWSModel } from "../../models/master/PRSPWS.model";
import { IPRSPWS } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await PRSPWSModel.findAll({ order: [['createdAt', 'DESC']] });
        const result = convertId(items, 'PRSPWSId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRSPWSModel.findOne({ where: { PRSPWSId: id } });
        if (item) {
            const result = convertId([item], 'PRSPWSId');
            res.status(200).send(result[0]);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const item: IPRSPWS = req.body;
        const newItem = await PRSPWSModel.create(item as any);
        const result = convertId([newItem], 'PRSPWSId');
        res.status(201).json(result[0]);
    } catch (e: any) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'already exists' });
        } else {
            res.status(500).send(e);
        }
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const itemUpdate = req.body;
        const existingItem = await PRSPWSModel.findOne({ where: { PRSPWSId: id } });;
        if (existingItem) {
            await PRSPWSModel.update(itemUpdate, { where: { PRSPWSId: id } });
            const updatedItem = await PRSPWSModel.findOne({ where: { PRSPWSId: id } });
            const result = convertId([updatedItem], 'PRSPWSId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRSPWSModel.create(itemUpdate);
            res.status(201).json(newItem);
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
        const deletedCount = await PRSPWSModel.destroy({ where: { PRSPWSId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
