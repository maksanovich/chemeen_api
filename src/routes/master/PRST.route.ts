import express from "express";
import * as PRSTContoller from '../../controllers/master/PRST.controller';

export const PRSTRouter = express.Router();

PRSTRouter.get('/', PRSTContoller.findAll);
PRSTRouter.get('/:id', PRSTContoller.find);
PRSTRouter.post('/', PRSTContoller.create);
PRSTRouter.put('/:id', PRSTContoller.update);
PRSTRouter.delete('/:id', PRSTContoller.remove);
