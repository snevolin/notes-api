import { ForbiddenException } from '@nestjs/common';

export class SpellingCheckFailedException extends ForbiddenException {
  constructor() {
    super(`Spelling check failed`);
  }
}
