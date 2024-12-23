import { Module } from '@nestjs/common';
import { SpellCheckerService } from './spellchecker.service';
import { SpellCheckerClient } from './https-client';

@Module({
  imports: [],
  providers: [
    {
      provide: 'HttpClient',
      useClass: SpellCheckerClient,
    },
    SpellCheckerService,
  ],
  exports: [SpellCheckerService],
})
export class SpellCheckerModule {}
