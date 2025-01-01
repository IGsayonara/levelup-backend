import { Injectable, NotFoundException } from '@nestjs/common';
import { IProject } from './interfaces/project.inerface';
import { ProjectEntity } from './entities/project.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserService } from '../user/services/user.service';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserProfileEntity } from '../user/entities/user-profile.entity';

@Injectable()
export class ProjectService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}
  async getPaginated(query: PaginateQuery): Promise<Paginated<ProjectEntity>> {
    return paginate(query, this.projectRepository, {
      relations: ['projectSkills'],
      sortableColumns: ['id', 'title'],
      searchableColumns: ['title'],
      filterableColumns: { title: [FilterOperator.ILIKE] },
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      defaultLimit: 4,
    });
  }

  async findOne(
    findOptionsWhere: FindOptionsWhere<ProjectEntity>,
  ): Promise<IProject | null> {
    return await ProjectEntity.createQueryBuilder('project')
      .leftJoinAndSelect('project.projectSkills', 'projectSkill')
      .leftJoinAndSelect('projectSkill.skill', 'skill')
      .where(findOptionsWhere)
      .getOne();
  }

  async addOne(createProjectDto: CreateProjectDto): Promise<IProject | null> {
    console.log(createProjectDto);
    const project = new ProjectEntity();
    Object.assign(project, createProjectDto);
    await project.save();
    return project;
  }

  async updateOne(
    updateProjectDto: Partial<CreateProjectDto>,
    findOptionsWhere: FindOptionsWhere<ProjectEntity>,
  ): Promise<IProject | null> {
    const project = await ProjectEntity.createQueryBuilder('project')
      .where(findOptionsWhere)
      .getOne();

    if (!project) {
      throw new NotFoundException();
    }

    await ProjectEntity.createQueryBuilder('project')
      .update()
      .set(updateProjectDto)
      .where({ id: project.id })
      .execute();

    return this.findOne(findOptionsWhere);
  }
}
