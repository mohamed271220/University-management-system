import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/shared/types';

@Injectable()
export class UserService {
  async createUser(
    username: string,
    email: string,
    password: string,
    role: Role,
  ) {
    const passwordHash = await bcrypt.hash(password, 10);
    return User.create({
      username,
      email,
      passwordHash,
      role,
    });
  }

  async findUserByUsername(username: string) {
    return User.findOne({ where: { username } });
  }

  async findUserById(id: string) {
    return User.findByPk(id);
  }

  async updateUser(
    id: string,
    updates: Partial<{ username: string; password: string; role: Role }>,
  ) {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    return User.update(updates, { where: { id } });
  }
}
