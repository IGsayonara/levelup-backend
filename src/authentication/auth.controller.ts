import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { EmptyResponse } from '../common/utils/response/empty-response.util';
import { EmptyResponseDto } from '../common/dto/empty-response.dto';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ type: AuthResponseDto, status: HttpStatus.OK })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body() _body: LoginDto) {
    return await this.authService.login(req.user);
  }

  @ApiResponse({ type: EmptyResponseDto, status: HttpStatus.CREATED })
  @ApiBearerAuth('refreshToken')
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() body: RegisterDto): Promise<EmptyResponseDto> {
    await this.authService.register(body);
    return EmptyResponse;
  }

  @ApiBearerAuth('refreshToken')
  @ApiResponse({ type: AuthResponseDto, status: HttpStatus.OK })
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  refreshTokens(@Request() req): Promise<AuthResponseDto> {
    const userId = req.user.id;
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
