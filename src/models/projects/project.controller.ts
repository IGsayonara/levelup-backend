import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project-response.dto';
import { ProjectMapper } from './mappers/project.mapper';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiResponse({ type: Paginated<ProjectResponseDto> })
  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<ProjectResponseDto>> {
    const paginatedProjectEntity = await this.projectService.getPaginated(
      query,
    );

    const mappedData: ProjectResponseDto[] = paginatedProjectEntity.data.map(
      ProjectMapper.toDto,
    );

    return {
      ...paginatedProjectEntity,
      data: mappedData,
    } as Paginated<ProjectResponseDto>;
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
