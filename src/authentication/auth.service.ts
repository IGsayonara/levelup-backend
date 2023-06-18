import { Injectable } from '@nestjs/common';
import { UserService } from '../models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  async login(signInDto: SignInDto) {
    const username = signInDto.username;
    const payload = { username: signInDto.username };

    const refreshToken = this.jwtService.sign(payload);
    await this.setRefreshToken(username, refreshToken);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload),
    };
  }

  async logout(username: string) {
    await this.removeRefreshToken(username);
  }

  private async setRefreshToken(username: string, refreshToken: string) {
    await this.userService.setRefreshToken(username, refreshToken);
  }

  private async removeRefreshToken(username: string) {
    await this.userService.setRefreshToken(username);
  }
}
