import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';

import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectResponseDto } from './dto/project-response.dto';
import { AccessTokenGuard } from '../../authentication/guards/access-token-guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserService } from '../user/user.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

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

  @ApiBearerAuth()
  @ApiResponse({ type: ProjectResponseDto })
  @UseGuards(AccessTokenGuard)
  @Put('/edit/:id')
  async updateOne(
    @Req() req,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.projectService.updateOne(req.body as CreateProjectDto, {
      id,
    });
  }
}
