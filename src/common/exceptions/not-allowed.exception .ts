import { ForbiddenException } from '@nestjs/common';

export class NotAllowedException extends ForbiddenException {
  constructor() {
    super(`Not allowed`);
  }
}
