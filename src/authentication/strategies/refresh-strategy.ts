import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { refreshJwtConfig } from '../../config/jwt.config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfig.secret,
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    return { username: payload.username };
  }
}
