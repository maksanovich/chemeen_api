import { Request, Response } from 'express';
import { TestModel } from "../../models/master/test.model";
import { ITest } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await TestModel.findAll({ order: [['createdAt', 'ASC']] });
        // const testDescValues = items.map((item: any) => item.testDesc);
        // res.status(200).send(testDescValues);
        const result = convertId(items, 'testId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await TestModel.findOne({ where: { testId: id } });
        if (item) {
            const result = convertId([item], 'testId');
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
        const item: ITest = req.body;
        const newItem = await TestModel.create(item as any);
        const result = convertId([newItem], 'testId');
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
        const existingItem = await TestModel.findOne({ where: { testId: id } });;
        if (existingItem) {
            await TestModel.update(itemUpdate, { where: { testId: id } });
            const updatedItem = await TestModel.findOne({ where: { testId: id } });
            const result = convertId([updatedItem], 'testId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await TestModel.create(itemUpdate);
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
        const deletedCount = await TestModel.destroy({ where: { testId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
