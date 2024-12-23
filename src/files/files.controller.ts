import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FileIsRequiredException } from '../common/exceptions';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

const FILE_SIZE_LIMIT = 1024 * 1024 * 100; // Up to 100 Mb

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuid()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: FILE_SIZE_LIMIT,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new FileIsRequiredException();
    }
    return this.filesService.processFile(file);
  }
}
