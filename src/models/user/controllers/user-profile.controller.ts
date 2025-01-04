import {
  Body,
  Controller,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AccessTokenGuard } from '../../../authentication/guards/access-token-guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user.response.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserProfileService } from '../services/user-profile.service';
import { UserProfileUpdateDto } from '../dto/userProfile.update.dto';
import { multerOptions } from '../../../common/configs/mutler.config';
import { RequestWithUser } from '../../../common/interfaces/withUser-interface';

@ApiTags('UserProfile')
@Controller('/userProfile')
export class UserProfileController {
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({ type: UserResponseDto })
  @UseGuards(AccessTokenGuard)
  @Put('/general')
  async updateOne(
    @Body() body: UserProfileUpdateDto,
    @Req() req: RequestWithUser,
  ): Promise<UserResponseDto> {
    await this.userProfileService.updateOne(
      { username: req.user.username },
      body,
    );

    return await this.userService.findOne({ username: req.user.username });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/profileImage')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions()))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    await this.userProfileService.updateOne(
      {
        username: req.user.username,
      },
      {
        profileImage: file.path,
      },
    );

    return {
      message: 'Profile image uploaded successfully',
      filename: file.filename,
      path: file.path, // Full path to the uploaded file
    };
  }
}
