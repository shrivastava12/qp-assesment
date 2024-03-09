import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/models';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWTKEY'),
    });
  }

  async validate(payload: any) {
    console.log(payload,'Payload')
    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      throw new UnauthorizedException('You are not a authorized user');
    }
    return payload;
  }
}