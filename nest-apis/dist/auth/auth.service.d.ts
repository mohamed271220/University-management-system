import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDtoLogin, AuthCredentialsDtoSignUp } from './dto/auth-credentials.dto';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDtoSignUp): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDtoLogin): Promise<{
        accessToken: string;
    }>;
    logOut(): Promise<void>;
}
