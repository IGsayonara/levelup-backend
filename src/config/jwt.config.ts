import { JwtModuleOptions } from '@nestjs/jwt';
import { appConfig } from './app.config';

export const authJwtConfig: JwtModuleOptions = {
  secret: appConfig.authTokenSecret,
  signOptions: {
    expiresIn: appConfig.authTokenLifeTime,
  },
};

export const refreshJwtConfig: JwtModuleOptions = {
  secret: appConfig.refreshTokenSecret,
  signOptions: {
    expiresIn: appConfig.refreshTokenLifeTime,
  },
};
