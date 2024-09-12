import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../models/user/entities/user.entity';
import { ProjectEntity } from '../../models/projects/entities/project.entity';

@Injectable()
export class ProjectSeederService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async create(): Promise<ProjectEntity[]> {
    return Promise.all(
      new Array(5).fill(null).map(async (_, i) => {
        const project = this.projectRepository.create({
          title: `Project ${i}`,
          description: 'descr',
        });

        await this.projectRepository.save(project);

        return project;
      }),
    );
  }
}
