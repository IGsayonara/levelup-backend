import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
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
  async updateUserProjectSkill(@Req() req: any, @Param('id') id: number) {
    return await this.userService.updateUserProjectSkill({ id }, req.body);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('/userProjectSkill/add')
  async addUserProjectSkill(@Req() req: any) {
    const { userProjectId, skillId } = req.body;

    if (!userProjectId || !skillId) {
      throw new NotFoundException('Missing userProjectId or skillId');
    }

    return await this.userService.addSkillToUserProject(userProjectId, skillId);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('/userSkill/add/:skillId')
  async addUserSkill(@Req() req: any, @Param('skillId') skillId: number) {
    return await this.userService.addUserSkill(req.user.id, skillId);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/userProject/edit/:id')
  async updateUserProject(@Req() req: any, @Param('id') id: number) {
    return await this.userService.updateUserProject({ id }, req.body);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('/userProject/delete/:id')
  async deleteUserProject(@Req() req: any, @Param('id') id: number) {
    return await this.userService.deleteUserProject({ id });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('/userSkill/delete/:id')
  async deleteUserSkill(@Req() req: any, @Param('id') id: number) {
    return await this.userService.deleteUserSkill({ id });
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('/userProjectSkill/delete/:id')
  async deleteUserProjectSkill(@Req() req: any, @Param('id') id: number) {
    return await this.userService.deleteUserProjectSkill({ id });
  }
}
