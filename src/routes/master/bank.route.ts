import express from "express";
import * as bankController from '../../controllers/master/bank.controller';

export const bankRouter = express.Router();

bankRouter.get('/', bankController.findAll);
bankRouter.get('/:id', bankController.find);
bankRouter.post('/', bankController.create);
bankRouter.put('/:id', bankController.update);
bankRouter.delete('/:id', bankController.remove);
