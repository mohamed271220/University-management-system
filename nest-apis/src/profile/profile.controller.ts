import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Controller('api/v1/profile')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/')
  getProfile(@GetUser() user: User) {
    return this.profileService.getProfile(user.id);
  }

  @Post('/')
  createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @GetUser() user: User,
  ) {
    return this.profileService.createProfile(createProfileDto, user);
  }

  @Put('/')
  updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @GetUser() user: User,
  ) {
    return this.profileService.updateProfile(updateProfileDto, user);
  }

  @Delete('/')
  deleteProfile(@GetUser() user: User) {
    return this.profileService.deleteProfile(user.id);
  }
}
