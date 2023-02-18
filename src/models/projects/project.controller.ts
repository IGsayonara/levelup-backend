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
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.projectService.getProjects(query);
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
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return await this.projectService.addProject(
      createProjectDto,
      req.user.username,
    );
  }
}
