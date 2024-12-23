import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { FilesModule } from './files/files.module';
import { SpellCheckerModule } from './spellchecker/spellchecker.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    NotesModule,
    FilesModule,
    SpellCheckerModule,
  ],
})
export class AppModule {}
