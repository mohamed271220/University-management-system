import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  AuthCredentialsDtoLogin,
  AuthCredentialsDtoSignUp,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDtoSignUp): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDtoLogin,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/logout')
  logOut(): Promise<void> {
    return this.authService.logOut();
  }
}
