import { Request, Response } from 'express';
import { PRSVModel } from "../../models/master/PRSV.model";
import { IPRSV } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await PRSVModel.findAll({ order: [['createdAt', 'DESC']] });
        const result = convertId(items, 'PRSVId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRSVModel.findOne({ where: { PRSVId: id } });
        if (item) {
            const result = convertId([item], 'PRSVId');
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
        const item: IPRSV = req.body;
        const newItem = await PRSVModel.create(item as any);
        const result = convertId([newItem], 'PRSVId');
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
        const existingItem = await PRSVModel.findOne({ where: { PRSVId: id } });;
        if (existingItem) {
            await PRSVModel.update(itemUpdate, { where: { PRSVId: id } });
            const updatedItem = await PRSVModel.findOne({ where: { PRSVId: id } });
            const result = convertId([updatedItem], 'PRSVId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRSVModel.create(itemUpdate);
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
        const deletedCount = await PRSVModel.destroy({ where: { PRSVId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
