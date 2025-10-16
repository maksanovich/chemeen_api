import express from "express";
import * as PRSPWSContoller from '../../controllers/master/PRSPWS.controller';

export const PRSPWSRouter = express.Router();

PRSPWSRouter.get('/', PRSPWSContoller.findAll);
PRSPWSRouter.get('/:id', PRSPWSContoller.find);
PRSPWSRouter.post('/', PRSPWSContoller.create);
PRSPWSRouter.put('/:id', PRSPWSContoller.update);
PRSPWSRouter.delete('/:id', PRSPWSContoller.remove);
