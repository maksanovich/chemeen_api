import { Request, Response } from 'express';
import { PortModel } from "../../models/master/port.model";
import { IPort } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';
import sequelize from '../../config/sequelize';
import { QueryTypes } from 'sequelize';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.query;
    try {
        switch (type) {
            case "country": {
                const query = `
                    SELECT DISTINCT country FROM tbl_ports
                    `;
                const results = await sequelize.query(query, {
                    type: QueryTypes.SELECT,
                });
                res.status(200).send(results);
                break;
            }
            default: {
                const items = await PortModel.findAll({ order: [["createdAt", "DESC"]] });
                const result = convertId(items, "portId");
                res.status(200).send(result);
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PortModel.findOne({ where: { portId: id } });
        if (item) {
            const result = convertId([item], 'portId');
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
        const item: IPort = req.body;
        const newItem = await PortModel.create(item as any);
        const result = convertId([newItem], 'portId');
        res.status(201).json(result[0]);
    } catch (e: any) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'Port name already exists' });
        } else {
            res.status(500).send(e);
        }
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const itemUpdate = req.body;
        const existingItem = await PortModel.findOne({ where: { portId: id } });;
        if (existingItem) {
            await PortModel.update(itemUpdate, { where: { portId: id } });
            const updatedItem = await PortModel.findOne({ where: { portId: id } });
            const result = convertId([updatedItem], 'portId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PortModel.create(itemUpdate);
            res.status(201).json(newItem);
        }
    } catch (e: any) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send({ message: 'Port name already exists' });
        } else {
            res.status(500).send(e);
        }
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const deletedCount = await PortModel.destroy({ where: { portId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
