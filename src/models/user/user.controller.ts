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
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseInterceptors(TransformInterceptor)
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AccessTokenGuard)
  @Get('/me')
  async findCurrent(@Req() req) {
    return this.userService.findOneByUsername(req.user.username);
  }

  @Get('/:username')
  async findOne(
    @Param('username')
    username: string,
  ) {
    return this.userService.findOneByUsername(username);
  }
}
