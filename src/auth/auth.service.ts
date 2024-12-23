import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/common/constants';

interface IApiKeyConfig {
  ANONYMOUS_API_KEY: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<IApiKeyConfig>,
  ) {}

  async validateUserByApiKey(apiKey: string) {
    if (apiKey === this.configService.get<string>('ANONYMOUS_API_KEY')) {
      return { id: null, role: UserRole.Anonymous };
    }
    return null;
  }

  async validateUserByToken(payload: any) {
    // payload = { sub: userId, role: 'user' }
    return this.usersService.findOne(payload.sub);
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
