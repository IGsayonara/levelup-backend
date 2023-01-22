import { Controller, Get, Res } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(@Res() res) {
    res.json(this.projectService.getProjects());
  }
}
