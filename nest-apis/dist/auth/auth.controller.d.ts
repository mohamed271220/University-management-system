import { AuthCredentialsDtoLogin, AuthCredentialsDtoSignUp } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDtoSignUp): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDtoLogin): Promise<{
        accessToken: string;
    }>;
    logOut(): Promise<void>;
}
