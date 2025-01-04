import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project.response.dto';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { ProjectUpdateDto } from './dto/project.update.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: ProjectResponseDto, status: HttpStatus.OK })
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async updateOne(
    @Body() body: ProjectUpdateDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.projectService.updateOne(body, {
      id,
    });
  }
}
