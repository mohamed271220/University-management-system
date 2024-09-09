import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from 'src/profile/profile.entity';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { User } from 'src/user/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile,
  ) {}

  async getProfile(userId: string): Promise<Profile> {
    return this.profileModel.findOne({
      where: { userId },
    });
  }

  async createProfile(
    createProfileDto: CreateProfileDto,
    user: User,
  ): Promise<Profile> {
    const profile = await this.profileModel.findOne({
      where: { userId: user.id },
    });
    if (profile) {
      throw new NotFoundException('Profile already exists');
    }
    return this.profileModel.create({
      id: uuid(),
      ...createProfileDto,
      userId: user.id,
    });
  }

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
    user: User,
  ): Promise<Profile> {
    const profile = await this.profileModel.findOne({
      where: { userId: user.id },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile.update(updateProfileDto);
  }

  async deleteProfile(userId: string): Promise<void> {
    const profile = await this.profileModel.findOne({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    await profile.destroy();
  }
}
