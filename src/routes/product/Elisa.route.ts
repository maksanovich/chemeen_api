import express from "express";
import * as ElisaController from '../../controllers/product/Elisa.controller';

export const ElisaRouter = express.Router();

ElisaRouter.get('/', ElisaController.findAll);
ElisaRouter.get('/:id', ElisaController.find);
ElisaRouter.post('/', ElisaController.create);
ElisaRouter.put('/:id', ElisaController.update);
ElisaRouter.delete('/:id', ElisaController.remove);
