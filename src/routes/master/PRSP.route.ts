import express from "express";
import * as PRSPContoller from '../../controllers/master/PRSP.controller';

export const PRSPRouter = express.Router();

PRSPRouter.get('/', PRSPContoller.findAll);
PRSPRouter.get('/:id', PRSPContoller.find);
PRSPRouter.post('/', PRSPContoller.create);
PRSPRouter.put('/:id', PRSPContoller.update);
PRSPRouter.delete('/:id', PRSPContoller.remove);
