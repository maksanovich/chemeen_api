import express from "express";
import * as PRSPSContoller from '../../controllers/master/PRSPS.controller';

export const PRSPSRouter = express.Router();

PRSPSRouter.get('/', PRSPSContoller.findAll);
PRSPSRouter.get('/:id', PRSPSContoller.find);
PRSPSRouter.post('/', PRSPSContoller.create);
PRSPSRouter.put('/:id', PRSPSContoller.update);
PRSPSRouter.delete('/:id', PRSPSContoller.remove);
