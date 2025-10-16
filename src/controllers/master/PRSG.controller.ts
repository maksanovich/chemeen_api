import { Request, Response } from 'express';
import { PRSGModel } from "../../models/master/PRSG.model";
import { IPRSG } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { PRSPSId } = req.query;
    try {
        const queryOptions: any = {
            order: [['createdAt', 'DESC']]
        };

        if (PRSPSId) {
            queryOptions.where = { PRSPSId };
        }

        const items = await PRSGModel.findAll(queryOptions);
        const result: any[] = convertId(items, 'PRSGId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRSGModel.findOne({ where: { PRSGId: id } });
        if (item) {
            const result = convertId([item], 'PRSGId');
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
        const item: IPRSG = req.body;
        const newItem = await PRSGModel.create(item as any);
        const result = convertId([newItem], 'PRSGId');
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
        const existingItem = await PRSGModel.findOne({ where: { PRSGId: id } });;
        if (existingItem) {
            await PRSGModel.update(itemUpdate, { where: { PRSGId: id } });
            const updatedItem = await PRSGModel.findOne({ where: { PRSGId: id } });
            const result = convertId([updatedItem], 'PRSGId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRSGModel.create(itemUpdate);
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
        const deletedCount = await PRSGModel.destroy({ where: { PRSGId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
