import { Request, Response } from 'express';
import { PRSPWModel } from "../../models/master/PRSPW.model";
import { IPRSPW } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await PRSPWModel.findAll({ order: [['createdAt', 'DESC']] });
        const result = convertId(items, 'PRSPWId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRSPWModel.findOne({ where: { PRSPWId: id } });
        if (item) {
            const result = convertId([item], 'PRSPWId');
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
        const item: IPRSPW = req.body;
        const newItem = await PRSPWModel.create(item as any);
        const result = convertId([newItem], 'PRSPWId');
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
        const existingItem = await PRSPWModel.findOne({ where: { PRSPWId: id } });;
        if (existingItem) {
            await PRSPWModel.update(itemUpdate, { where: { PRSPWId: id } });
            const updatedItem = await PRSPWModel.findOne({ where: { PRSPWId: id } });
            const result = convertId([updatedItem], 'PRSPWId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRSPWModel.create(itemUpdate);
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
        const deletedCount = await PRSPWModel.destroy({ where: { PRSPWId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
