import express from 'express';
import * as ElisaPDFController from '../../controllers/product/ElisaPDF.controller';
import { uploadElisaPDF } from '../../config/multer.config';
import multer from 'multer';

export const ElisaPDFRouter = express.Router();

// Upload with error handling
ElisaPDFRouter.post('/upload', (req, res, next) => {
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

// Get by PI
ElisaPDFRouter.get('/by-pi/:PIId', ElisaPDFController.getPDFsByPI);

// Download latest PDF by PIId (must be before /:pdfId routes)
ElisaPDFRouter.get('/latest/:PIId/download', ElisaPDFController.downloadLatestPDFByPI);

// Get by ID
ElisaPDFRouter.get('/:pdfId', ElisaPDFController.getPDFById);

// Download
ElisaPDFRouter.get('/:pdfId/download', ElisaPDFController.downloadPDF);

// Delete
ElisaPDFRouter.delete('/:pdfId', ElisaPDFController.deletePDF);
