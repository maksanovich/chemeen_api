import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../../config/sequelize';
import { ItemModel } from '../../models/product/item.model';
import { IElisa } from "../../config/productInterfaces";

import { convertId } from '../../common/utils';
import { ItemDetailModel } from '../../models/product/itemDetail.model';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type, ItemId }: any = req.query;
    
    try {
        switch (type) {
            case 'name': {
                const result = await getItemsByItemID(ItemId);
                res.status(200).send(result[0]);
            } break;
            default: {
                const items = await getItems('');
                res.status(200).send(items);
            }
        }

    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const results = await getItems(id);
        if (results.length > 0) {
            res.status(200).send(results);
        } else {
            res.status(200).send([]);
        }
    } catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
};

export const findByPIId = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const results = await getItems(id);
        if (results) {
            res.status(200).send(results);
        } else {
            res.status(404).send([]);
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { PIId, data } = req.body;
        if (!PIId || typeof data !== 'object' || Array.isArray(data)) {
            res.status(400).send({ error: 'Invalid input data' });
            return;
        }

        const newItem: any = await ItemModel.create({
            ...data,
            PIId,
        });
        const results = await getItemsByItemID(newItem.ItemId);
        res.status(200).send(results[0]);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};


export const update = async (req: Request, res: Response): Promise<void> => {
    // const id: string = req.params.id;
    try {
        // const itemUpdate = req.body;
        const { ItemId, data } = req.body;
        const existingItem = await ItemModel.findOne({ where: { ItemId: ItemId } });;
        if (existingItem) {
            await ItemModel.update(data, { where: { ItemId: ItemId } });
            const results = await getItemsByItemID(ItemId);
            res.status(200).json(results[0]);
        } else {
            const newItem = await ItemModel.create(data);
            const results = await getItems(newItem.dataValues.ItemId);
            res.status(201).json(results[0]);
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
        const response = await ItemDetailModel.destroy({ where: { ItemId: id } });
        const deletedCount = await ItemModel.destroy({ where: { ItemId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        console.log(e, '=======');

        res.status(500).send(e);
    }
};

const getItems = async (id: string) => {
    const query = `
            SELECT 
                item.*, 
                prs.PRSName,
                prst.PRSTName
            FROM tbl_items AS item
            LEFT JOIN tbl_prs AS prs
                ON prs.PRSId = item.PRSId
            LEFT JOIN tbl_prst AS prst
                ON prst.PRSTId = item.PRSTId
            WHERE item.PIId = :id;
        `;

    if (id != '') {
        const results = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT
        });
        return results;
    } else {
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return results;
    }
}

const getItemsByItemID = async (id: string) => {
    const query = `
            SELECT 
                item.*, 
                prs.PRSName,
                prst.PRSTName
            FROM tbl_items AS item
            LEFT JOIN tbl_prs AS prs
                ON prs.PRSId = item.PRSId
            LEFT JOIN tbl_prst AS prst
                ON prst.PRSTId = item.PRSTId
            WHERE item.ItemId = :id;
        `;

    if (id != '') {
        const results = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT
        });
        return results;
    } else {
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return results;
    }
}