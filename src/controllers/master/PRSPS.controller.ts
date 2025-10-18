import { Request, Response } from 'express';
import { PRSPSModel } from "../../models/master/PRSPS.model";
import { PRSGModel } from '../../models/master/PRSG.model';
import { IPRSPS } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.query;
    try {
        const items = await PRSPSModel.findAll({
            where: {},
            include: type === 'prsg'
                ? [{ model: PRSGModel, required: true, attributes: [] }]
                : [],
            order: [['createdAt', 'DESC']],
        });

        const result = convertId(items, 'PRSPSId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRSPSModel.findOne({ where: { PRSPSId: id } });
        if (item) {
            const result = convertId([item], 'PRSPSId');
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
        const item: IPRSPS = req.body;
        const newItem = await PRSPSModel.create(item as any);
        const result = convertId([newItem], 'PRSPSId');
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
        const existingItem = await PRSPSModel.findOne({ where: { PRSPSId: id } });;
        if (existingItem) {
            await PRSPSModel.update(itemUpdate, { where: { PRSPSId: id } });
            const updatedItem = await PRSPSModel.findOne({ where: { PRSPSId: id } });
            const result = convertId([updatedItem], 'PRSPSId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRSPSModel.create(itemUpdate);
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
        const deletedCount = await PRSPSModel.destroy({ where: { PRSPSId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
