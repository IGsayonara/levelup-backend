import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { IAccessTokenPayload } from './interfaces/accessToken-payload.interface';
import { HashService } from '../common/services/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isPasswordCorrect = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return user;
  }

  async login(user: IAccessTokenPayload) {
    const { id, username } = user;

    const tokens = await this.getTokens(id, username);
    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async register(user: RegisterDto) {
    const hashedPassword = await this.hashService.hash(user.password);

    return await this.userService.addOne({
      username: user.username,
      password: hashedPassword,
    });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashService.hash(refreshToken);
    await this.userService.updateOne(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findOne({ id: userId });

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await this.hashService.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.username);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
