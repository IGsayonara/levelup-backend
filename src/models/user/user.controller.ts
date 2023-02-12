import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../authentication/guards/local-auth.guard';

@UseInterceptors(TransformInterceptor)
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  async findOne(
    @Param('username')
    username: string,
  ) {
    return this.userService.getUser(username);
  }
}
