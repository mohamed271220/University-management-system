import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  AuthCredentialsDtoLogin,
  AuthCredentialsDtoSignUp,
} from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signUp(authCredentialsDto: AuthCredentialsDtoSignUp): Promise<void> {
    const { username, password, email } = authCredentialsDto;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await User.create({
        id: uuid(),
        username,
        passwordHash: hashedPassword,
        email,
        role: 'Student',
      });
    } catch (error) {
      Logger.error('Failed to create user', error.stack);
      throw new InternalServerErrorException();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDtoLogin,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await User.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const payload: JwtPayload = { username, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        secret: 'secret',
        // expiresIn: process.env.JWT_EXPIRATION_TIME,
      });
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async logOut(): Promise<void> {
    // No implementation needed for stateless JWT
  }
}
