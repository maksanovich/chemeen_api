import express from "express";
import * as ElisaDetailController from '../../controllers/product/ElisaDetail.controller';

export const ElisaDetailRouter = express.Router();

ElisaDetailRouter.get('/', ElisaDetailController.findAll);
ElisaDetailRouter.get('/:id', ElisaDetailController.find);
ElisaDetailRouter.post('/', ElisaDetailController.create);
ElisaDetailRouter.put('/:id', ElisaDetailController.update);
ElisaDetailRouter.delete('/:id', ElisaDetailController.remove);
