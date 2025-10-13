import { Request, Response } from 'express';
import { BankModel } from "../../models/master/bank.model";
import { IBank } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await BankModel.findAll({ order: [['createdAt', 'DESC']] });
        const result = convertId(items, 'bankId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await BankModel.findOne({ where: { bankId: id } });
        if (item) {
            const result = convertId([item], 'bankId');
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
        const item: IBank = req.body;
        const newItem = await BankModel.create(item as any);
        const result = convertId([newItem], 'bankId');
        res.status(201).json(result[0]);
    } catch (e: any) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'Bank name already exists' });
        } else {
            res.status(500).send(e);
        }
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const itemUpdate = req.body;
        const existingItem = await BankModel.findOne({ where: { bankId: id } });;
        if (existingItem) {
            await BankModel.update(itemUpdate, { where: { bankId: id } });
            const updatedItem = await BankModel.findOne({ where: { bankId: id } });
            const result = convertId([updatedItem], 'bankId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await BankModel.create(itemUpdate);
            res.status(201).json(newItem);
        }
    } catch (e: any) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'Company name already exists' });
        } else {
            res.status(500).send(e);
        }
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const deletedCount = await BankModel.destroy({ where: { bankId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
