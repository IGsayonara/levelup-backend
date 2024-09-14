import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../../../models/projects/entities/project.entity';
import { SkillEntity } from '../../../models/skill/entities/skill.entity';
import { ProjectFactoryService } from '../../factories/project/project.service';

@Injectable()
export class ProjectSeederService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    private readonly projectFactoryService: ProjectFactoryService,
  ) {}

  async create(): Promise<ProjectEntity[]> {
    return Promise.all(
      new Array(5).fill(null).map(async (_, i) => {
        const project = this.projectRepository.create(
          this.projectFactoryService.generateProject(),
        );

        await this.projectRepository.save(project);

        return project;
      }),
    );
  }

  async addSkills(
    project: ProjectEntity,
    skills: SkillEntity[],
  ): Promise<ProjectEntity> {
    if (!project.skills) {
      project.skills = [];
    }

    project.skills.push(...skills);
    await project.save();
    return project;
  }
}
