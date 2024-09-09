import { ProfileService } from './profile.service';
import { User } from '../user/user.entity';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(user: User): Promise<import("./profile.entity").Profile>;
    createProfile(createProfileDto: CreateProfileDto, user: User): Promise<import("./profile.entity").Profile>;
    updateProfile(updateProfileDto: UpdateProfileDto, user: User): Promise<import("./profile.entity").Profile>;
    deleteProfile(user: User): Promise<void>;
}
