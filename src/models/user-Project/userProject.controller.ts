import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserProjectService } from './userProject.service';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import * as fs from 'node:fs';
import { ProjectResponseDto } from '../projects/dto/project.response.dto';
import { ProjectCreateDto } from '../projects/dto/project.create.dto';
import { ProjectService } from '../projects/project.service';
import { UserProjectUpdateDto } from './dto/user-project.update.dto';
import {
  CreatedResponse,
  EmptyResponse,
} from '../../common/utils/response/empty-response.util';
import { EmptyResponseDto } from '../../common/dto/response/empty-response.dto';
import { RequestWithUser } from '../../common/interfaces/withUser-interface';

const uploadDirectory = './uploads';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

@ApiTags('User - Project')
@Controller('/userProject')
export class UserProjectController {
  constructor(
    private userProjectService: UserProjectService,
    private projectService: ProjectService,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({ type: EmptyResponseDto, status: HttpStatus.CREATED })
  @ApiNotFoundResponse()
  @UseGuards(AccessTokenGuard)
  @Post('/')
  async addOne(
    @Req() req: RequestWithUser,
    @Body() body: ProjectCreateDto,
  ): Promise<EmptyResponseDto> {
    const userId = req.user.id;
    const project = await this.projectService.addOne(body);

    await this.userProjectService.addProjectToUser(userId, project.id);

    return CreatedResponse;
  }

  @ApiBearerAuth()
  @ApiResponse({ type: UserProjectUpdateDto, status: HttpStatus.OK })
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async updateOne(@Body() body: UserProjectUpdateDto, @Param('id') id: number) {
    return await this.userProjectService.updateOne({ id }, body);
  }

  @ApiBearerAuth()
  @ApiResponse({ type: EmptyResponseDto })
  @ApiNotFoundResponse()
  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteOne(@Param('id') id: number): Promise<EmptyResponseDto> {
    await this.userProjectService.deleteOne({ id });

    return EmptyResponse;
  }
}
