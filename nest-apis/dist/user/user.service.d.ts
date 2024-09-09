import { User } from './user.entity';
import { Role } from 'src/shared/types';
export declare class UserService {
    createUser(username: string, email: string, password: string, role: Role): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    findUserById(id: string): Promise<User>;
    updateUser(id: string, updates: Partial<{
        username: string;
        password: string;
        role: Role;
    }>): Promise<[affectedCount: number]>;
}
