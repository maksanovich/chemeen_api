import { Request, Response } from 'express';
import { PRSTModel } from "../../models/master/PRST.model";
import { IPRST } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await PRSTModel.findAll({ order: [['createdAt', 'DESC']] });
        const result = convertId(items, 'PRSTId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRSTModel.findOne({ where: { PRSTId: id } });
        if (item) {
            const result = convertId([item], 'PRSTId');
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
        const item: IPRST = req.body;
        const newItem = await PRSTModel.create(item as any);
        const result = convertId([newItem], 'PRSTId');
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
        const existingItem = await PRSTModel.findOne({ where: { PRSTId: id } });;
        if (existingItem) {
            await PRSTModel.update(itemUpdate, { where: { PRSTId: id } });
            const updatedItem = await PRSTModel.findOne({ where: { PRSTId: id } });
            const result = convertId([updatedItem], 'PRSTId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRSTModel.create(itemUpdate);
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
        const deletedCount = await PRSTModel.destroy({ where: { PRSTId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
