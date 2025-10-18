import express from "express";
import * as PRSContoller from '../../controllers/master/PRS.controller';

export const PRSRouter = express.Router();

PRSRouter.get('/', PRSContoller.findAll);
PRSRouter.get('/:id', PRSContoller.find);
PRSRouter.post('/', PRSContoller.create);
PRSRouter.put('/:id', PRSContoller.update);
PRSRouter.delete('/:id', PRSContoller.remove);
