import express from "express";
import * as TestController from '../../controllers/master/test.controller';

export const testRouter = express.Router();

testRouter.get('/', TestController.findAll);
testRouter.get('/:id', TestController.find);
testRouter.post('/', TestController.create);
testRouter.put('/:id', TestController.update);
testRouter.delete('/:id', TestController.remove);
