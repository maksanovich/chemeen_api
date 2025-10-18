import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Simple upload directory
const uploadDir = path.join(__dirname, '../../uploads/elisa-pdfs');

// Create directory if not exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Simple storage configuration
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, uploadDir);
    },
    filename: (req: any, file: any, cb: any) => {
        // Simple timestamp filename
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
    }
});

// File filter - PDFs only
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files allowed'), false);
    }
};

// Export multer instance
export const uploadElisaPDF = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 7 * 1024 * 1024 } // 7MB limit
});

