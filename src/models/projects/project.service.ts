import { Injectable, NotFoundException } from '@nestjs/common';
import { IProject } from './interfaces/project.inerface';
import { ProjectEntity } from './entities/project.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';
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
}
