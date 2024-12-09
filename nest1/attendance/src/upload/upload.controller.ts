// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import * as fs from 'fs';
// import * as path from 'path';

// @Controller('upload')
// export class UploadController {
//   @Post()
//   @UseInterceptors(
//     FileInterceptor('file_asset', {
//       storage: diskStorage({
//         destination: './files',
//         filename: (req, file, cb) => {
//           const uniqueName = `${Date.now()}-${file.originalname}`;
//           cb(null, uniqueName);
//         },
//       }),
//       fileFilter: (req, file, cb) => {
//         if (file.mimetype === 'text/csv') {
//           cb(null, true);
//         } else {
//           cb(new Error('Only CSV files are allowed'), false);
//         }
//       },
//     }),
//   )
//   async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
//     if (!file) {
//       return { message: 'No file uploaded' };
//     }

//     const filePath = path.join(__dirname, '..', '..', 'files', file.filename);
//     const csvContent = fs.readFileSync(filePath, 'utf8');
    
//     // Parse CSV and store in PostgreSQL
//     const rows = csvContent.split('\n').map((row) => row.split(','));
//     console.log('CSV Rows:', rows); // Example parsing; replace with your logic for DB insertion

//     return {
//       message: 'File uploaded successfully',
//       filename: file.filename,
//     };
//   }
// }
