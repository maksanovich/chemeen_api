import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

import sequelize from '../../config/sequelize';
import { PIModel } from "../../models/product/PI.model";
import { IPI } from "../../config/productInterfaces";

import { convertId } from '../../common/utils';

export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await getItems('');
        res.status(200).send(items);
    } catch (e) {
        res.status(500).send(e);
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const results = await getItems(id);
        if (results.length > 0) {
            res.status(200).send(results[0]);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export const filter = async (req: Request, res: Response): Promise<void> => {
    try {
        let { countryId, startDate, endDate } = req.body;

        // Normalize missing params → null
        countryId = countryId || null;
        startDate = startDate || null;
        endDate = endDate || null;

        const query = `
            SELECT
                pi.*,
                pi.PIId AS _id,
                ec.companyName AS exporterName, 
                ec.address1 AS exporterAddress,
                pc.companyName AS processorName, 
                cc.companyName AS consigneeName,
                lp.portName AS loadingPortName, 
                lp.country AS loadingPortCountry, 
                dp.portName AS dischargePortName, 
                dp.country AS dischargePortCountry,
                bn.bankName AS bankName
            FROM tbl_pi AS pi
            JOIN tbl_companies AS ec ON pi.exporterId = ec.companyId
            JOIN tbl_companies AS pc ON pi.processorId = pc.companyId
            JOIN tbl_companies AS cc ON pi.consigneeId = cc.companyId
            JOIN tbl_banks AS bn ON pi.bankId = bn.bankId
            JOIN tbl_ports AS lp ON pi.loadingPortId = lp.portId
            JOIN tbl_ports AS dp ON pi.dischargePortId = dp.portId
            WHERE (:countryId IS NULL OR lp.country = :countryId OR dp.country = :countryId)
            AND (
                (:startDate IS NULL OR :endDate IS NULL)
                OR pi.PIDate BETWEEN :startDate AND :endDate
            )
            ORDER BY pi.createdAt DESC
        `;

        const results = await sequelize.query(query, {
            replacements: { countryId, startDate, endDate },
            type: QueryTypes.SELECT,
        });

        res.status(200).send(results);
    } catch (e) {
        console.error("Filter Error:", e);
        res.status(500).send({ message: "Server Error", error: e });
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const item: IPI = req.body;

        const existing = await PIModel.findOne({ where: { PINo: item.PINo } });
        if (existing) {
            res.status(409).json({ message: "PI with this PINo already exists" });
            return;
        }

        const newItem = await PIModel.create(item as any);
        const results = await getItems(newItem.dataValues.PIId);
        res.status(201).json(results[0]);
    } catch (e: any) {
        res.status(500).send(e);
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const itemUpdate = req.body;
        const existingItem = await PIModel.findOne({ where: { PIId: id } });;
        if (existingItem) {
            const existing = await PIModel.findOne({ where: { PINo: itemUpdate.PINo } });
            if (existing) {
                res.status(409).json({ message: "PI with this PINo already exists" });
                return;
            }

            await PIModel.update(itemUpdate, { where: { PIId: id } });
            const results = await getItems(id);
            res.status(200).json(results[0]);
        } else {
            const existing = await PIModel.findOne({ where: { PINo: itemUpdate.PINo } });
            if (existing) {
                res.status(409).json({ message: "PI with this PINo already exists" });
                return;
            }

            const newItem = await PIModel.create(itemUpdate);
            const results = await getItems(newItem.dataValues.PIId);
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
        const deletedCount = await PIModel.destroy({ where: { PIId: id } });
        if (deletedCount) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

const getItems = async (id: string) => {
    const query = `
            SELECT 
            pi.*,
            pi.PIId AS _id,
            ec.companyName AS exporterName, 
            ec.address1 AS exporterAddress,
            pc.companyName AS processorName, 
            cc.companyName AS consigneeName, 
            lp.portName AS loadingPortName, 
            lp.country AS loadingPortCountry, 
            dp.portName AS dischargePortName, 
            dp.country AS dischargePortCountry,
            bn.bankName AS bankName
            FROM 
            tbl_pi AS pi
            JOIN 
            tbl_companies AS ec ON pi.exporterId = ec.companyId
            JOIN 
            tbl_companies AS pc ON pi.processorId = pc.companyId
            JOIN 
            tbl_companies AS cc ON pi.consigneeId = cc.companyId
            JOIN 
            tbl_ports AS lp ON pi.loadingPortId = lp.portId
            JOIN 
            tbl_ports AS dp ON pi.dischargePortId = dp.portId
            JOIN 
            tbl_banks AS bn ON pi.bankId= bn.bankId
            ${id != '' ? "WHERE  pi.PIId = :id" : ''}
            ORDER BY pi.createdAt DESC
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