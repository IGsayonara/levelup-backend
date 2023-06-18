import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInDto } from './dto/signin.dto';

@UseInterceptors(TransformInterceptor)
@UseGuards(LocalAuthGuard)
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/local/signin')
  async localSignIn(@Body() signInDto: SignInDto) {
    return await this.authService.login(signInDto);
  }
  @Post('/local/signup')
  async localSignUp(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('/logout')
  async logout(@Request() req) {
    return await this.authService.logout(req.user.username);
  }

  @Post('/refresh')
  async refreshTokens(@Request() req) {
    return await this.authService.login(req.user);
  }
}
