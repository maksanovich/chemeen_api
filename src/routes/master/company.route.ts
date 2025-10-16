import express from "express";
import * as companyController from '../../controllers/master/company.controller';

export const companyRouter = express.Router();

companyRouter.get('/', companyController.findAll);
companyRouter.get('/:id', companyController.find);
companyRouter.post('/', companyController.create);
companyRouter.put('/:id', companyController.update);
companyRouter.delete('/:id', companyController.remove);
