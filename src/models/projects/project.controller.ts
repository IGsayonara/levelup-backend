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
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AccessTokenGuard)
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
  @UseGuards(AccessTokenGuard)
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return await this.projectService.addProject(
      createProjectDto,
      req.user.username,
    );
  }
}
