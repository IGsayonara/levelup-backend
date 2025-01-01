import {
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserProjectService } from './userProject.service';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import * as fs from 'node:fs';
import { ProjectResponseDto } from '../projects/dto/project-response.dto';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { ProjectService } from '../projects/project.service';

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
  @ApiResponse({ type: ProjectResponseDto })
  @UseGuards(AccessTokenGuard)
  @Post('/')
  async addOne(@Req() req) {
    const userId = req.user.id;
    const project = await this.projectService.addOne(
      req.body as CreateProjectDto,
    );

    await this.userProjectService.addProjectToUser(userId, project.id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async updateUserProject(@Req() req: any, @Param('id') id: number) {
    return await this.userProjectService.updateUserProject({ id }, req.body);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteUserProject(@Req() req: any, @Param('id') id: number) {
    return await this.userProjectService.deleteUserProject({ id });
  }
}
