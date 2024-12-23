import { ForbiddenException } from '@nestjs/common';

export class NotAllowedToEditThisNoteException extends ForbiddenException {
  constructor() {
    super(`Not allowed to edit this note`);
  }
}
