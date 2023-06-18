import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../models/user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { authJwtConfig, refreshJwtConfig } from '../config/jwt.config';
import { RefreshTokenStrategy } from './strategies/refresh-strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register(authJwtConfig),
    JwtModule.register(refreshJwtConfig),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
