import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api_key'];
    if (!apiKey) return false;

    const user = await this.authService.validateUserByApiKey(apiKey);
    if (user) {
      request.user = user;
      return true;
    }
    return false;
  }
}
