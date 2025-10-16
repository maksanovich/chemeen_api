import { Request, Response } from 'express';
import { PRSModel } from "../../models/master/PRS.model";
import { IPRS } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { PRFId } = req.query;
    try {
        const queryOptions: any = {
            order: [['createdAt', 'DESC']]
        };

        if (PRFId) {
            queryOptions.where = { PRFId };
        }

        const items = await PRSModel.findAll(queryOptions);
        const result: any[] = convertId(items, 'PRSId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRSModel.findOne({ where: { PRSId: id } });
        if (item) {
            const result = convertId([item], 'PRSId');
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
        const item: IPRS = req.body;
        const newItem = await PRSModel.create(item as any);
        const result = convertId([newItem], 'PRSId');
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
        const existingItem = await PRSModel.findOne({ where: { PRSId: id } });;
        if (existingItem) {
            await PRSModel.update(itemUpdate, { where: { PRSId: id } });
            const updatedItem = await PRSModel.findOne({ where: { PRSId: id } });
            const result = convertId([updatedItem], 'PRSId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRSModel.create(itemUpdate);
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
        const deletedCount = await PRSModel.destroy({ where: { PRSId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
