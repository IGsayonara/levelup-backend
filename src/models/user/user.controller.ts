import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';

@UseInterceptors(TransformInterceptor)
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findCurrent(@Req() req) {
    return this.userService.getUser(req.user.username);
  }

  @Get('/:username')
  async findOne(
    @Param('username')
    username: string,
  ) {
    return this.userService.getUser(username);
  }
}
