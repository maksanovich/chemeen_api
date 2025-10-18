import express from "express";
import * as BarController from '../../controllers/product/BAR.controller';

export const BarRoute = express.Router();

BarRoute.get('/', BarController.findAll);
BarRoute.get('/:id', BarController.find);
BarRoute.post('/', BarController.create);
BarRoute.put('/', BarController.update);
BarRoute.delete('/:id', BarController.remove);
BarRoute.delete('/item/:id', BarController.removeItem);
