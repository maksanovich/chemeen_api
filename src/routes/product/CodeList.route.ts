import express from "express";
import * as CodeListController from '../../controllers/product/CodeList.controller';

export const CodeListRoute = express.Router();

CodeListRoute.get('/', CodeListController.findAll);
CodeListRoute.get('/:id', CodeListController.find);
CodeListRoute.post('/', CodeListController.create);
CodeListRoute.put('/', CodeListController.update);
CodeListRoute.delete('/:id', CodeListController.remove);
