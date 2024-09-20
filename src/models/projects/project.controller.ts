import {
  Body,
  Controller,
  Get,
  HttpStatus,
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

  @ApiResponse({ type: ProjectResponseDto })
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

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
  ) {
    return await this.projectService.getOne(id);
  }

  @Post('/add')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return await this.projectService.addProject(
      createProjectDto,
      req.user.username,
    );
  }
}
