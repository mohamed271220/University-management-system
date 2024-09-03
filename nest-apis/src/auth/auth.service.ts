import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
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
        username,
        passwordHash: hashedPassword,
        email,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await User.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const payload: JwtPayload = { username, role: user.role };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
