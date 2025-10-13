import { Request, Response } from 'express';
import { PRFModel } from "../../models/master/PRF.model";
import { IPRF } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await PRFModel.findAll({ order: [['createdAt', 'DESC']] });
        const result = convertId(items, 'PRFId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRFModel.findOne({ where: { PRFId: id } });
        if (item) {
            const result = convertId([item], 'PRFId');
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
        const item: IPRF = req.body;
        const newItem = await PRFModel.create(item as any);
        const result = convertId([newItem], 'PRFId');
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
        const existingItem = await PRFModel.findOne({ where: { PRFId: id } });;
        if (existingItem) {
            await PRFModel.update(itemUpdate, { where: { PRFId: id } });
            const updatedItem = await PRFModel.findOne({ where: { PRFId: id } });
            const result = convertId([updatedItem], 'PRFId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRFModel.create(itemUpdate);
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
        const deletedCount = await PRFModel.destroy({ where: { PRFId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
