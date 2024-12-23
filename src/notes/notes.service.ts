import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note, User } from '../common/entities';
import {
  NoteNotFoundException,
  SpellingCheckFailedException,
  NotAllowedException,
  NotAllowedToEditThisNoteException,
} from '../common/exceptions';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { SpellCheckerService } from '../spellchecker/spellchecker.service';
import { UserRole } from '../common/constants';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepo: Repository<Note>,
    private readonly spellCheckerService: SpellCheckerService,
  ) {}

  async create(dto: CreateNoteDto, user: any) {
    const isValid = await this.spellCheckerService.check(dto.title, dto.text);
    if (!isValid) {
      throw new SpellingCheckFailedException();
    }

    const note = this.notesRepo.create({
      ...dto,
      // If user.userId = null then it's an anonymous
      author: user?.userId ? { id: user.userId } : null,
    });
    return this.notesRepo.save(note);
  }

  async findAll() {
    return this.notesRepo.find({ relations: ['author'] });
  }

  async findOne(id: number) {
    const note = await this.notesRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!note) {
      throw new NoteNotFoundException();
    }

    return note;
  }

  async update(id: number, dto: CreateNoteDto, user: any) {
    const note = await this.findOne(id);

    if (note?.author.id !== user.userId && user.role !== UserRole.SuperAdmin) {
      throw new NotAllowedToEditThisNoteException();
    }

    const isValid = await this.spellCheckerService.check(dto.title, dto.text);
    if (!isValid) {
      throw new SpellingCheckFailedException();
    }

    Object.assign(note, dto);
    return this.notesRepo.save(note);
  }

  async remove(id: number, user: any) {
    const note = await this.findOne(id);

    if (note?.author.id !== user.userId && user.role !== UserRole.SuperAdmin) {
      throw new NotAllowedException();
    }

    return this.notesRepo.remove(note);
  }
}
