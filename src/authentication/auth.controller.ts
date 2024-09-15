import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return { success: true };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Request() req) {
    const userId = req.user.id;
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
