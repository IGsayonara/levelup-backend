import * as process from 'process';

export const appConfig = {
  authTokenSecret: process.env.AUTH_TOKEN_SECRET,
  authTokenLifeTime: process.env.AUTH_TOKEN_LIFE_TIME,
  refreshTokenSecret: process.env.REFERESH_TOKEN_SECRET,
  refreshTokenLifeTime: process.env.REFERESH_TOKEN_LIFE_TIME,
};
