import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@Res() res) {
    res.json(this.projectService.getProjects());
  }

  @Get('/:id')
  findOne(@Param('id') id, @Res() res) {
    res.json(this.projectService.getProject(id));
  }

  @Post('/add')
  create(@Body() createProjectDto: CreateProjectDto, @Res() res) {
    res.json(createProjectDto);
  }
}
