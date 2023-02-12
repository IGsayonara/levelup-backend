import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { IUser } from '../user/interfaces/user.interface';
import { UserEntity } from '../user/entities/user.entity';

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
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return await this.projectService.addProject(
      createProjectDto,
      req.user.username,
    );
  }
}
