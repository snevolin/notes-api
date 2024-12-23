import { BadRequestException } from '@nestjs/common';

export class FileIsRequiredException extends BadRequestException {
  constructor() {
    super(`File is required`);
  }
}
