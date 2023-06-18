import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { authJwtConfig } from '../../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authJwtConfig.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    return { username: payload.username };
  }
}
