import { Model } from 'sequelize-typescript';
import { User } from '../user/user.entity';
export declare class Profile extends Model<Profile> {
    id: string;
    firstName: string;
    lastName: string;
    dob?: Date;
    contactNumber?: string;
    address?: string;
    userId: string;
    user: User;
    createdAt?: Date;
    updatedAt?: Date;
    fullName: string;
}
