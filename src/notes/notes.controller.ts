import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { JwtAuthStrictGuard, JwtAuthOptionalGuard } from '../auth/guards';
import { NoteVisibilityInterceptor } from '../common/interceptors/note-visibility.interceptor';

@Controller('notes')
@UseInterceptors(NoteVisibilityInterceptor)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(ApiKeyGuard)
  @Post('anonymous')
  async createAnonymous(@Body() dto: CreateNoteDto, @Req() req) {
    return this.notesService.create(dto, req.user);
  }

  @UseGuards(JwtAuthStrictGuard)
  @Post()
  async create(@Body() dto: CreateNoteDto, @Req() req) {
    return this.notesService.create(dto, req.user);
  }

  @UseGuards(JwtAuthOptionalGuard)
  @Get()
  async findAll() {
    return this.notesService.findAll();
  }

  @UseGuards(JwtAuthOptionalGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.notesService.findOne(id);
  }

  @UseGuards(JwtAuthStrictGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateNoteDto,
    @Req() req,
  ) {
    return this.notesService.update(id, dto, req.user);
  }

  @UseGuards(JwtAuthStrictGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    return this.notesService.remove(id, req.user);
  }
}
