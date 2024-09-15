import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return user;
  }

  async login(user: LoginDto) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterDto) {
    const hashedPassword = await bcrypt.hash(
      user.password,
      +this.configService.get('BCRYPT_SALT'),
    );

    return await this.userService.addOne({
      username: user.username,
      password: hashedPassword,
    });
  }
}
