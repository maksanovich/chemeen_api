import express from "express";
import * as ItemDetailController from '../../controllers/product/itemDetails.controller';

export const ItemDetailRoute = express.Router();

ItemDetailRoute.get('/', ItemDetailController.findAll);
ItemDetailRoute.get('/:id', ItemDetailController.find);
ItemDetailRoute.get('/filter/:id', ItemDetailController.findByPIId);
ItemDetailRoute.post('/', ItemDetailController.create);
ItemDetailRoute.put('/', ItemDetailController.update);
ItemDetailRoute.delete('/:id', ItemDetailController.remove);
