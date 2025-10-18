import express from "express";
import * as PRSVContoller from '../../controllers/master/PRSV.controller';

export const PRSVRouter = express.Router();

PRSVRouter.get('/', PRSVContoller.findAll);
PRSVRouter.get('/:id', PRSVContoller.find);
PRSVRouter.post('/', PRSVContoller.create);
PRSVRouter.put('/:id', PRSVContoller.update);
PRSVRouter.delete('/:id', PRSVContoller.remove);
