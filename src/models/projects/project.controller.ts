import {
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project-response.dto';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: ProjectResponseDto, status: HttpStatus.OK })
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async updateOne(
    @Req() req,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.projectService.updateOne(req.body as CreateProjectDto, {
      id,
    });
  }
}
