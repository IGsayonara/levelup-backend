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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDTO } from './dto/user-response.dto';
import { ProjectMapper } from '../projects/mappers/project.mapper';
import { UserMapper } from './mappers/user.mapper';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@UseInterceptors(TransformInterceptor)
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: UserResponseDTO })
  @Get('/me')
  async findCurrent(@Req() req): Promise<UserResponseDTO> {
    const user = await this.userService.findOneByUsername(req.user.username);
    return UserMapper.toDto(user);
  }

  @ApiResponse({ type: UserResponseDTO })
  @Get('/:username')
  async findOne(
    @Param('username')
    username: string,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.findOneByUsername(username);
    return UserMapper.toDto(user);
  }
}
