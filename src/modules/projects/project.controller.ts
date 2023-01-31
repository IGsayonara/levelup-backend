import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll() {
    return await this.projectService.getProjects();
  }

  @Get('/:id')
  async findOne(@Param('id') id) {
    return await this.projectService.getProject(id);
  }

  @Post('/add')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.addProject(createProjectDto);
  }

  @Put('/:id')
  async changeOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectService.updateProject(id, createProjectDto);
  }
}
