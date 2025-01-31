import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  /**
   * Upload a file and save it to the file system.
   * @param file - The file object provided by Multer.
   * @returns The file path where the file is stored.
   */
  async uploadFile(file: any): Promise<string> {

    const filePath = `uploads/${file.filename}`;

    try {
      await fs.writeFile(filePath, file.buffer);
      return filePath;
    } catch (error) {
      throw new NotFoundException('Error uploading the file');
    }
  }

  /**
   * Delete a file from the server using the full file path.
   * @param filePath - The full file path to delete.
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath); // No need to join, just pass the full file path
    } catch (error) {
      throw new NotFoundException('Error deleting the file');
    }
  }
}
