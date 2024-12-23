import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note } from '../common/entities';
import { SpellCheckerModule } from '../spellchecker/spellchecker.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), SpellCheckerModule, AuthModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
