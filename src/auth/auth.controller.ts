import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserNotFoundException } from '../common/exceptions';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // TODO: implement checking passwords
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (!user) {
      throw new UserNotFoundException();
    }

    return this.authService.login(user);
  }
}
