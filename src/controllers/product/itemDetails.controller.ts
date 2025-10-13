import { Request, Response } from 'express';
import { ItemDetailModel } from "../../models/product/itemDetail.model";
import { convertId } from '../../common/utils';
import sequelize from '../../config/sequelize';
import { QueryTypes } from 'sequelize';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    const { type, ItemId } = req.query;
    console.log(type, '===', ItemId);

    try {
        try {
            switch (type) {
                case 'PRSG': {
                    const query = `
                            SELECT 
                            pd.PRSGId, 
                            (SELECT psg.PRSGDesc FROM tbl_prsg as psg WHERE psg.PRSGId = pd.PRSGId) as value
                            FROM 
                            tbl_item_details as pd 
                            WHERE pd.ItemId = :ItemId
                        `;

                    const results = await sequelize.query(query, {
                        replacements: { ItemId },
                        type: QueryTypes.SELECT
                    });
                    res.status(200).send(results);
                } break;
                case 'sumCartons': {
                    const query = `
                            SELECT SUM(COALESCE(cartons, 0)) as sumCartons
                            FROM tbl_item_details
                            WHERE ItemId = :ItemId;
                        `;

                    const results = await sequelize.query(query, {
                        replacements: { ItemId },
                        type: QueryTypes.SELECT
                    });
                    res.status(200).send(results[0]);
                } break;
                default: {
                    const items = await ItemDetailModel.findAll({ order: [['createdAt', 'DESC']] });
                    const result = convertId(items, 'itemDetailId');
                    res.status(200).send(result);
                } break;
            }
        } catch (e) {
            res.status(500).send(e);
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const results = await getItem(id);
        if (results) {
            res.status(200).send(results);
        } else {
            res.status(404).send([]);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const findByPIId = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const results = await getItemByPIID(id);
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
        const { ItemId, details } = req.body;
        console.log(ItemId, details, '-=======');


        if (!ItemId || !Array.isArray(details)) {
            res.status(400).send({ error: 'Invalid input data' });
        } else {
            await Promise.all(details.map(async (detail) => {
                return await ItemDetailModel.create({
                    ...detail,
                    ItemId,
                });
            }));
            const results = await getItem(ItemId);
            res.status(200).send(results);
        }

    } catch (e) {
        res.status(500).send(e);
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ItemId, details } = req.body;
        console.log(ItemId, 'ItemId===');

        if (!ItemId || !Array.isArray(details)) {
            res.status(400).send({ error: 'Invalid input data' });
        } else {

            await ItemDetailModel.destroy({ where: { ItemId: ItemId } });
            await Promise.all(details.map(async (detail) => {
                return await ItemDetailModel.create({
                    ...detail,
                    ItemId,
                });
            }));
            const results = await getItem(ItemId);
            res.status(200).send(results);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const deletedCount = await ItemDetailModel.destroy({ where: { ItemId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


const getItem = async (ItemId: any) => {
    const query = `
        SELECT 
        (SELECT prsg.PRSGDesc FROM tbl_prsg as prsg WHERE pid.PRSGId = prsg.PRSGId) as size,
        pid.PRSGId,
        pid.cartons,
        pid.kgQty,
        pid.usdRate,
        pid.usdAmount
        FROM 
        tbl_item_details AS pid
        WHERE pid.itemId = :ItemId
    `;

    const results = await sequelize.query(query, {
        replacements: { ItemId },
        type: QueryTypes.SELECT
    });

    return results;
}

const getItemByPIID = async (PIId: any) => {
    const query = `
        SELECT 
            ti.ItemId,
            pid.PRSGId,
            pid.cartons,
            pid.kgQty,
            pid.usdRate,
            pid.usdAmount,
            (SELECT prsg.PRSGDesc 
             FROM tbl_prsg AS prsg 
             WHERE pid.PRSGId = prsg.PRSGId) AS size
        FROM tbl_item_details AS pid
        INNER JOIN tbl_items AS ti ON ti.ItemId = pid.itemId
        WHERE ti.PIId = :PIId
    `;

    const results: any[] = await sequelize.query(query, {
        replacements: { PIId },
        type: QueryTypes.SELECT
    });

    // reshape to desired format
    const itemDetail = results.reduce((acc, row) => {
        let item = acc.find((i: any) => i.itemId === row.ItemId);
        const data = {
            PRSGId: row.PRSGId,
            cartons: row.cartons,
            kgQty: row.kgQty,
            size: row.size,
            usdAmount: row.usdAmount,
            usdRate: row.usdRate
        };
        if (item) {
            item.data.push(data);
        } else {
            acc.push({
                itemId: row.ItemId,
                data: [data]
            });
        }
        return acc;
    }, [] as any[]);

    return itemDetail;
};