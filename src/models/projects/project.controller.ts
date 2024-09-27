import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';

import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project-response.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiResponse({ type: Paginated<ProjectResponseDto> })
  // @ResponseType(ProjectResponseDto)
  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<ProjectResponseDto>> {
    return (await this.projectService.getPaginated(
      query,
    )) as any as Paginated<ProjectResponseDto>;
  }

  @ApiResponse({ type: ProjectResponseDto })
  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<ProjectResponseDto> {
    const project = await this.projectService.findOne({ id });

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }
}
