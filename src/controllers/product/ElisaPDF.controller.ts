import { Request, Response } from 'express';
import fs from 'fs';
import { ElisaPDFModel } from '../../models/product/ElisaPDF.model';

// Upload PDF
export const uploadPDF = async (req: any, res: Response): Promise<void> => {
    try {
        console.log('Upload request body:', req.body);
        console.log('Upload request file:', req.file);
        
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const { pdfName, PIId, PINo } = req.body;

        if (!PIId || !pdfName) {
            // Delete file only if it exists
            if (req.file.path && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ message: 'PIId and pdfName are required' });
            return;
        }

        // Create display name: pdfName + PINo + date
        const date = new Date().toISOString().split('T')[0];
        const displayName = `${pdfName} - ${PINo || 'INV'} - ${date}`;

        const pdf = await ElisaPDFModel.create({
            PIId: parseInt(PIId),
            pdfName: displayName,  // Display name with PINo and date
            fileName: req.file.filename,  // Simple timestamp filename
            filePath: req.file.path,
            fileSize: req.file.size,
            uploadDate: new Date(),
        });

        res.status(200).json({
            message: 'Upload successful',
            data: pdf
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        // Delete file only if it exists
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};

// Get all PDFs by PIId
export const getPDFsByPI = async (req: Request, res: Response): Promise<void> => {
    try {
        const { PIId } = req.params;
        const pdfs = await ElisaPDFModel.findAll({
            where: { PIId: parseInt(PIId) },
            order: [['uploadDate', 'DESC']]
        });
        res.status(200).json(pdfs);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to get PDFs', error: error.message });
    }
};

// Get PDF by ID
export const getPDFById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pdfId } = req.params;
        const pdf = await ElisaPDFModel.findByPk(parseInt(pdfId));
        
        if (!pdf) {
            res.status(404).json({ message: 'PDF not found' });
            return;
        }
        
        res.status(200).json(pdf);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to get PDF', error: error.message });
    }
};

// Download PDF
export const downloadPDF = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pdfId } = req.params;
        console.log(`Attempting to download PDF with ID: ${pdfId}`);
        
        const pdf = await ElisaPDFModel.findByPk(parseInt(pdfId));
        
        if (!pdf) {
            console.log(`PDF not found in database for ID: ${pdfId}`);
            res.status(404).json({ 
                message: 'PDF not found',
                details: `No PDF found with ID: ${pdfId}`,
                error: 'PDF_NOT_FOUND'
            });
            return;
        }

        const filePath = pdf.get('filePath') as string;
        console.log(`PDF found, file path: ${filePath}`);
        
        if (!fs.existsSync(filePath)) {
            console.log(`File not found on server at path: ${filePath}`);
            res.status(404).json({ 
                message: 'File not found on server',
                details: `File not found at path: ${filePath}`,
                error: 'FILE_NOT_FOUND'
            });
            return;
        }

        console.log(`Downloading file: ${filePath}`);
        res.download(filePath);
    } catch (error: any) {
        console.error('Download PDF error:', error);
        res.status(500).json({ 
            message: 'Download failed', 
            details: error.message,
            error: 'DOWNLOAD_ERROR'
        });
    }
};

// Download latest PDF by PIId
export const downloadLatestPDFByPI = async (req: Request, res: Response): Promise<void> => {
    try {
        const { PIId } = req.params;
        console.log(`Downloading latest Elisa PDF for PIId: ${PIId}`);
        
        // Find the latest PDF for this PI
        const pdf = await ElisaPDFModel.findOne({
            where: { PIId: parseInt(PIId) },
            order: [['uploadDate', 'DESC']]
        });
        
        if (!pdf) {
            console.log(`No Elisa PDF found for PIId: ${PIId}`);
            res.status(404).json({ message: 'No Elisa PDF found for this PI' });
            return;
        }

        const filePath = pdf.get('filePath') as string;
        console.log(`Found Elisa PDF, attempting to download from: ${filePath}`);
        
        if (!fs.existsSync(filePath)) {
            console.log(`File not found at path: ${filePath}`);
            res.status(404).json({ message: 'File not found on server' });
            return;
        }

        console.log(`Downloading file: ${filePath}`);
        res.download(filePath);
    } catch (error: any) {
        console.error('Download latest PDF error:', error);
        res.status(500).json({ message: 'Download failed', error: error.message });
    }
};

// Delete PDF
export const deletePDF = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pdfId } = req.params;
        const pdf = await ElisaPDFModel.findByPk(parseInt(pdfId));
        
        if (!pdf) {
            res.status(404).json({ message: 'PDF not found' });
            return;
        }

        const filePath = pdf.get('filePath') as string;
        
        // Delete file from server
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from database
        await ElisaPDFModel.destroy({ where: { pdfId: parseInt(pdfId) } });
        
        res.status(200).json({ message: 'PDF deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Delete failed', error: error.message });
    }
};
