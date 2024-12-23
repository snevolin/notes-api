import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async processFile(file: Express.Multer.File) {
    return { filePath: file.path };
  }
}
