import express from "express";
import * as CodeListController from '../../controllers/product/CodeList.controller';

export const CodeListRoute = express.Router();

CodeListRoute.get('/', CodeListController.findAll);
CodeListRoute.get('/:id', CodeListController.find);
CodeListRoute.get('/pi/:PIId', CodeListController.findByPIId);
CodeListRoute.get('/check-code/:PIId/:code', CodeListController.checkCode);
CodeListRoute.post('/', CodeListController.create);
CodeListRoute.put('/', CodeListController.update);
CodeListRoute.delete('/:id', CodeListController.remove);
