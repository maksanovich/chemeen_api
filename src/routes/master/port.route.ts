import express from "express";
import * as portController from '../../controllers/master/port.controller';

export const portRouter = express.Router();

portRouter.get('/', portController.findAll);
portRouter.get('/:id', portController.find);
portRouter.post('/', portController.create);
portRouter.put('/:id', portController.update);
portRouter.delete('/:id', portController.remove);
