import express from "express";
import * as PRSPWContoller from '../../controllers/master/PRSPW.controller';

export const PRSPWRouter = express.Router();

PRSPWRouter.get('/', PRSPWContoller.findAll);
PRSPWRouter.get('/:id', PRSPWContoller.find);
PRSPWRouter.post('/', PRSPWContoller.create);
PRSPWRouter.put('/:id', PRSPWContoller.update);
PRSPWRouter.delete('/:id', PRSPWContoller.remove);
