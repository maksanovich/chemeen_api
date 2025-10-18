import { Request, Response } from 'express';
import { CompanyModel } from "../../models/master/company.model";
import { ICompany } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.query;
    try {
        const queryOptions: any = {
            order: [['createdAt', 'DESC']]
        };

        if (type) {
            queryOptions.where = { type };
        }

        const items = await CompanyModel.findAll(queryOptions);
        const result: any[] = convertId(items, 'companyId');
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await CompanyModel.findOne({ where: { companyId: id } });
        if (item) {
            const result = convertId([item], 'companyId');
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
        const item: ICompany = req.body;
        const newItem = await CompanyModel.create(item as any);
        const result = convertId([newItem], 'companyId');
        res.status(201).json(result[0]);
    } catch (e: any) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'Company name already exists' });
        } else {
            res.status(500).send(e);
        }
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const itemUpdate = req.body;
        const existingItem = await CompanyModel.findOne({ where: { companyId: id } });;
        if (existingItem) {
            await CompanyModel.update(itemUpdate, { where: { companyId: id } });
            const updatedItem = await CompanyModel.findOne({ where: { companyId: id } });
            const result = convertId([updatedItem], 'companyId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await CompanyModel.create(itemUpdate);
            res.status(201).json(newItem);
        }
    } catch (e: any ) {
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
        const deletedCount = await CompanyModel.destroy({ where: { companyId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
