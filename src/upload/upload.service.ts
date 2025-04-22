import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';


@Injectable()
export class UploadService {
  private readonly uploadDir = join(__dirname, '..', '..', 'uploads', 'images');

  async uploadImage(file: Express.Multer.File): Promise<{ filename: string; path: string }> {
    if (!file) {
      throw new Error('No file provided');
    }

    // Tạo folder nếu chưa tồn tại
    if (!existsSync(this.uploadDir)) {
      await mkdir(this.uploadDir, { recursive: true });
    }

    const filename = `${uuidv4()}${extname(file.originalname)}`;
    const filePath = join(this.uploadDir, filename);

    // Ghi file vào thư mục
    await writeFile(filePath, file.buffer);

    return {
      filename,
      path: `/uploads/images/${filename}`,
    };
  }
}
