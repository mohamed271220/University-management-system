import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log('JwtStrategy validate called with payload:', payload);
    const { username } = payload;
    const user = await this.userModel.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('User found:', user.dataValues);
    return user; // The user object will be set in request.user
  }
}
