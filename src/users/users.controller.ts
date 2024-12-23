import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthStrictGuard } from '../auth/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthStrictGuard)
  @Get('me')
  async getMe(@Req() req) {
    const userInfo = await this.userService.getUserInfo(req.user.userId);
    return userInfo;
  }
}
