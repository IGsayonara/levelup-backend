import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  CreateProjectDto,
  CreatePrimaryProjectDto,
} from './dto/create-project.dto';
import {
  UpdatePrimaryProjectDto,
  UpdateProjectDto,
} from './dto/update-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(
    @Query(
      'page',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    page: number,
    @Query(
      'limit',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    limit: number,
  ) {
    return await this.projectService.getProjects(page, limit);
  }

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
  ) {
    return await this.projectService.getProject(id);
  }

  @Post('/add')
  async create(
    @Body() createPrimaryProjectDto: CreatePrimaryProjectDto,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const id = await this.projectService.addProject(createPrimaryProjectDto);
    await this.projectService.updateProjectSkills(id, createProjectDto.skills);
    return await this.projectService.getProject(id);
  }

  @Put('/:id')
  async changeOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
    @Body() updateProjectDto: UpdateProjectDto,
    @Body() updatePrimaryProjectDto: UpdatePrimaryProjectDto,
  ) {
    await this.projectService.updateProject(id, updatePrimaryProjectDto);
    await this.projectService.updateProjectSkills(id, updateProjectDto.skills);
    return await this.projectService.getProject(id);
  }
}
