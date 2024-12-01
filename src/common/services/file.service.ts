import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  private readonly hostUrl = 'http://localhost:3000';

  getFileUrl(filePath: string): string {
    return `${this.hostUrl}/uploads/${filePath}`;
  }
}
