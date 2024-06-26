import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { LocalAuthGuard } from './guards/local-auth.guard';

@UseInterceptors(TransformInterceptor)
@UseGuards(LocalAuthGuard)
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
