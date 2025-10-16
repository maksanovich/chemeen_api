import express from "express";
import * as ItemController from '../../controllers/product/item.controller';

export const ItemRouter = express.Router();

ItemRouter.get('/', ItemController.findAll);
ItemRouter.get('/:id', ItemController.find);
ItemRouter.get('/filter/:id', ItemController.findByPIId);
ItemRouter.get('/merged/:PIId', ItemController.getMergedDataByPIId);
ItemRouter.get('/:PIId/:ItemId', ItemController.getItemWithDetails);
ItemRouter.post('/', ItemController.create);
ItemRouter.put('/', ItemController.update);
ItemRouter.delete('/:id', ItemController.remove);
