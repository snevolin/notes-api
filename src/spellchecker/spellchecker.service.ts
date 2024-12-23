import { Injectable, Inject } from '@nestjs/common';
import { ISpellCheckerClient } from './https-client';
import { createSha256Hash } from './hash.util';
import { ConfigService } from '@nestjs/config';

interface ISpellCheckerConfig {
  SPELLCHEKER_SERVICE_URL: string;
}

@Injectable()
export class SpellCheckerService {
  constructor(
    @Inject('HttpClient')
    private readonly httpClient: ISpellCheckerClient,
    private readonly configService: ConfigService<ISpellCheckerConfig>,
  ) {}

  async check(title: string, text: string): Promise<boolean> {
    const body = { title, text };
    const hashHeader = createSha256Hash(title, text);

    const url = this.configService.get('SPELLCHEKER_SERVICE_URL');

    const res = await this.httpClient.post(url, body, {
      'X-Hash': hashHeader,
    });

    return res.isValid;
  }
}
