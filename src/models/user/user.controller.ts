import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDTO } from './dto/user-response.dto';
import { ResponseType } from '../../common/decorators/metadata/responseType.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-userProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'node:fs';
import { join } from 'path';

const uploadDirectory = './uploads';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: UserResponseDTO })
  @ResponseType(UserResponseDTO)
  @UseGuards(AccessTokenGuard)
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
  @ResponseType(UserResponseDTO)
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

  @ApiBearerAuth()
  @ApiResponse({ type: UserResponseDTO })
  @UseGuards(AccessTokenGuard)
  @Put('/me/general')
  async updateOne(@Req() req): Promise<UserResponseDTO> {
    return await this.userService.updateProfile(
      { username: req.user.username },
      req.body as UpdateUserProfileDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/me/profileImage')
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

    await this.userService.updateProfilePicture(
      {
        username: req.user.username,
      },
      path,
    );

    // Return a response with the file details
    return {
      message: 'Profile image uploaded successfully',
      filename: file.filename,
      path, // Full path to the uploaded file
    };
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/userProjectSkill/:id')
  async updateUserProjectSkill(@Req() req, @Param('id') id: number) {
    return await this.userService.updateUserProjectSkill({ id }, req.body);
  }
}
