import { NotFoundException } from '@nestjs/common';

export class NoteNotFoundException extends NotFoundException {
  constructor() {
    super(`Note not found`);
  }
}
