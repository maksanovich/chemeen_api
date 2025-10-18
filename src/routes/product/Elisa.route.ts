import express from "express";
import * as ElisaController from '../../controllers/product/Elisa.controller';
import * as ElisaPDFController from '../../controllers/product/ElisaPDF.controller';
import { uploadElisaPDF } from '../../config/multer.config';
import multer from 'multer';

export const ElisaRouter = express.Router();

ElisaRouter.get('/', ElisaController.findAll);
ElisaRouter.get('/:id', ElisaController.find);
ElisaRouter.post('/', ElisaController.create);
ElisaRouter.put('/:id', ElisaController.update);

// PDF Upload endpoint with error handling
ElisaRouter.post('/upload-pdf', (req, res, next) => {
    uploadElisaPDF.single('file')(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ 
                    message: 'File too large. Maximum size is 7MB.',
                    error: 'LIMIT_FILE_SIZE' 
                });
            }
            return res.status(400).json({ 
                message: 'File upload error', 
                error: err.message 
            });
        } else if (err) {
            return res.status(400).json({ 
                message: err.message || 'File upload failed',
                error: err.message 
            });
        }
        next();
    });
}, ElisaPDFController.uploadPDF);
ElisaRouter.delete('/:id', ElisaController.remove);
