import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['notes'] });
  }

  async getUserInfo(userId: number) {
    const user = await this.findOne(userId);
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      notesCount: user.notes ? user.notes.length : 0,
    };
  }

  async findByUsername(username: string) {
    // In real project we should check the hash of user password
    return this.repo.findOne({
      where: { username },
    });
  }
}
