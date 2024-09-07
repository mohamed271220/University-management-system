import { JwtPayload } from './interfaces';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userModel;
    constructor(configService: ConfigService, userModel: typeof User);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
