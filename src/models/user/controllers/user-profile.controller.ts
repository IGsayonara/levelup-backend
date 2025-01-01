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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDTO } from '../dto/user-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'node:fs';
import { join } from 'path';
import { UserProfileService } from '../services/user-profile.service';
import { UpdateUserProfileDto } from '../dto/update-userProfile.dto';

const uploadDirectory = './uploads';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

@ApiTags('UserProfile')
@Controller('/userProfile')
export class UserProfileController {
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({ type: UserResponseDTO })
  @UseGuards(AccessTokenGuard)
  @Put('/general')
  async updateOne(
    @Req() req,
    @Body() body: UpdateUserProfileDto,
  ): Promise<UserResponseDTO> {
    await this.userProfileService.updateOne(
      { username: req.user.username },
      body,
    );

    return await this.userService.findOne({ username: req.user.username });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/profileImage')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          // Specify where to save the uploaded file
          callback(null, uploadDirectory);
        },
        filename: (req, file, callback) => {
          // Define the filename format
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const path = join(uploadDirectory, file.filename);

    await this.userProfileService.updateOne(
      {
        username: req.user.username,
      },
      {
        profileImage: path,
      },
    );

    // Return a response with the file details
    return {
      message: 'Profile image uploaded successfully',
      filename: file.filename,
      path, // Full path to the uploaded file
    };
  }
}
