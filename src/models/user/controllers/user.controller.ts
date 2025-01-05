import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AccessTokenGuard } from '../../../authentication/guards/access-token-guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user.response.dto';
import { ResponseType } from '../../../common/decorators/metadata/responseType.decorator';
import { RequestWithUser } from '../../../common/interfaces/withUser-interface';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: UserResponseDto, status: HttpStatus.OK })
  @ResponseType(UserResponseDto)
  @UseGuards(AccessTokenGuard)
  @Get('/me')
  async findCurrent(@Req() req: RequestWithUser): Promise<UserResponseDto> {
    const user = await this.userService.findOne({
      username: req.user.username,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @ApiResponse({ type: UserResponseDto })
  @ResponseType(UserResponseDto)
  @Get('/:username')
  async findOne(
    @Param('username')
    username: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
