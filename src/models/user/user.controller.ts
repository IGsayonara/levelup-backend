import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDTO } from './dto/user-response.dto';
import { ResponseType } from '../../common/decorators/metadata/responseType.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: UserResponseDTO })
  @ResponseType(UserResponseDTO)
  @Get('/me')
  async findCurrent(@Req() req): Promise<UserResponseDTO> {
    const user = await this.userService.findOne({
      username: req.user.username,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @ApiResponse({ type: UserResponseDTO })
  @Get('/:username')
  async findOne(
    @Param('username')
    username: string,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
