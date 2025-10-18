import express from "express";
import * as PIController from '../../controllers/product/PI.controller';
import {
    exportPIPDF,
    exportCodeListPDF,
    exportTraceabilityPDF,
    exportBacteriologicalPDF,
    exportAllPDFs
} from "../../controllers/product/export.controller";

export const PIRouter = express.Router();

PIRouter.get('/', PIController.findAll);
PIRouter.get('/:id', PIController.find);
PIRouter.post('/filter', PIController.filter);
PIRouter.post('/', PIController.create);
PIRouter.put('/:id', PIController.update);
PIRouter.delete('/:id', PIController.remove);
PIRouter.get('/export/:id', exportAllPDFs);
PIRouter.get('/export/pi/:id', exportPIPDF);
PIRouter.get('/export/codelist/:id', exportCodeListPDF);
PIRouter.get('/export/traceability/:id', exportTraceabilityPDF);
PIRouter.get('/export/bar/:id', exportBacteriologicalPDF);
