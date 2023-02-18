import { Injectable, NotFoundException } from '@nestjs/common';
import { IProject } from './interfaces/project.inerface';
import { ProjectEntity } from './entities/project.entity';
import { In, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { SkillEntity } from '../skill/entities/skill.entity';
import { UserService } from '../user/user.service';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}
  async getProjects(query: PaginateQuery): Promise<Paginated<ProjectEntity>> {
    return paginate(query, this.projectRepository, {
      relations: ['skills'],
      sortableColumns: ['id', 'title'],
      searchableColumns: ['title'],
      filterableColumns: { title: [FilterOperator.ILIKE] },
      nullSort: 'last',
      defaultSortBy: [['created_at', 'DESC']],
      defaultLimit: 4,
    });
  }

  async getProject(id: number): Promise<IProject> {
    const project = await ProjectEntity.findOne({
      where: {
        id,
      },
      relations: ['skills'],
    });

    if (!project) {
      throw new NotFoundException({
        message: `Can't find any project with id: ${id}`,
      });
    }

    return project;
  }

  async addProject(
    createProjectDto: CreateProjectDto,
    username,
  ): Promise<IProject> {
    const project = new ProjectEntity();

    const user = await this.userService.getUser(username);

    const skills: SkillEntity[] = createProjectDto.skills
      ? await SkillEntity.find({
          where: {
            id: In(createProjectDto.skills),
          },
        })
      : [];

    project.user = user;
    project.title = createProjectDto.title;
    project.description = createProjectDto.description;
    project.skills = skills;

    return await project.save();
  }
}
