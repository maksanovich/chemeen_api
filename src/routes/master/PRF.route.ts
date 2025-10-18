import express from "express";
import * as PRFContoller from '../../controllers/master/PRF.controller';

export const PRFRouter = express.Router();

PRFRouter.get('/', PRFContoller.findAll);
PRFRouter.get('/:id', PRFContoller.find);
PRFRouter.post('/', PRFContoller.create);
PRFRouter.put('/:id', PRFContoller.update);
PRFRouter.delete('/:id', PRFContoller.remove);
