import express from "express";
import * as PRSGContoller from '../../controllers/master/PRSG.controller';

export const PRSGRouter = express.Router();

PRSGRouter.get('/', PRSGContoller.findAll);
PRSGRouter.get('/:id', PRSGContoller.find);
PRSGRouter.post('/', PRSGContoller.create);
PRSGRouter.put('/:id', PRSGContoller.update);
PRSGRouter.delete('/:id', PRSGContoller.remove);
