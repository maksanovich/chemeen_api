# ELISA PDF Upload - Simple Guide

## Quick Setup

### 1. Install Package
```bash
cd chemeen_api
npm install multer @types/multer
```

### 2. Create Database Table
```bash
mysql -u USERNAME -p DATABASE_NAME < src/database/create-elisa-pdf-table.sql
```

### 3. Restart Server
```bash
npm run dev
```

## API Endpoints

### Upload PDF
```
POST /api/product/elisa/upload-pdf
Content-Type: multipart/form-data

Body:
- file: (PDF file)
- pdfName: (string)
- PIId: (number)
```

### Get PDFs by PI
```
GET /api/product/elisaPDF/by-pi/:PIId
```

### Get PDF by ID
```
GET /api/product/elisaPDF/:pdfId
```

### Download PDF
```
GET /api/product/elisaPDF/:pdfId/download
```

### Delete PDF
```
DELETE /api/product/elisaPDF/:pdfId
```

## Database Table

**Table:** `tbl_elisa_pdf`

| Column     | Type         |
|------------|--------------|
| pdfId      | INT (PK)     |
| PIId       | INT (FK)     |
| pdfName    | VARCHAR(255) |
| fileName   | VARCHAR(255) |
| filePath   | VARCHAR(500) |
| fileSize   | INT          |
| uploadDate | DATETIME     |
| createdAt  | DATETIME     |
| updatedAt  | DATETIME     |

## Upload Directory

Files are stored in: `uploads/elisa-pdfs/`

Format: `{timestamp}-{originalname}.pdf`

## Testing with cURL

```bash
# Upload
curl -X POST http://localhost:3000/api/product/elisa/upload-pdf \
  -F "file=@test.pdf" \
  -F "pdfName=Test Report" \
  -F "PIId=1"

# Get by PI
curl http://localhost:3000/api/product/elisaPDF/by-pi/1

# Download
curl http://localhost:3000/api/product/elisaPDF/1/download -o report.pdf

# Delete
curl -X DELETE http://localhost:3000/api/product/elisaPDF/1
```

## Done! 🚀

