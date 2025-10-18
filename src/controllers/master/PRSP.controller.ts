import { Request, Response } from 'express';
import { PRSPModel } from "../../models/master/PRSP.model";
import { IPRSP } from "../../config/masterInterfaces";
import { convertId } from '../../common/utils';
import sequelize from '../../config/sequelize';
import { QueryTypes } from 'sequelize';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = `
            SELECT 
            prsp.PRSPId AS _id,
            prsp.PRSPPiece,
            prsp.PRSPWeight,
            prspw.PRSPWUnit,
            prspws.PRSPWSStyle
            FROM 
            tbl_prsp AS prsp
            LEFT JOIN
            tbl_prspw as prspw ON prspw.PRSPWId = prsp.PRSPWId
            LEFT JOIN
            tbl_prspws as prspws ON prspws.PRSPWSId = prsp.PRSPWSId
        `;

        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });

        res.status(200).send(results);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const item = await PRSPModel.findOne({ where: { PRSPId: id } });
        if (item) {
            const result = convertId([item], 'PRSPId');
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
        const item: IPRSP = req.body;
        const newItem = await PRSPModel.create(item as any);
        const result = convertId([newItem], 'PRSPId');
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
        const existingItem = await PRSPModel.findOne({ where: { PRSPId: id } });;
        if (existingItem) {
            await PRSPModel.update(itemUpdate, { where: { PRSPId: id } });
            const updatedItem = await PRSPModel.findOne({ where: { PRSPId: id } });
            const result = convertId([updatedItem], 'PRSPId');
            res.status(200).json(result[0]);
        } else {
            const newItem = await PRSPModel.create(itemUpdate);
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
        const deletedCount = await PRSPModel.destroy({ where: { PRSPId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
