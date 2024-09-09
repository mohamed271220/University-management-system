import { Profile } from 'src/profile/profile.entity';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { User } from 'src/user/user.entity';
export declare class ProfileService {
    private readonly profileModel;
    constructor(profileModel: typeof Profile);
    getProfile(userId: string): Promise<Profile>;
    createProfile(createProfileDto: CreateProfileDto, user: User): Promise<Profile>;
    updateProfile(updateProfileDto: UpdateProfileDto, user: User): Promise<Profile>;
    deleteProfile(userId: string): Promise<void>;
}
