import { Injectable, NotFoundException } from '@nestjs/common';
import { IProject } from './interfaces/project.inerface';
import { ProjectEntity } from './entities/project.entity';
import { In, InsertResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { SkillEntity } from '../skill/entities/skill.entity';

@Injectable()
export class ProjectService {
  async getProjects(): Promise<IProject[]> {
    return await ProjectEntity.find({
      relations: ['skills'],
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
        message: `Can't find any skill with id: ${id}`,
      });
    }

    return project;
  }

  async addProject(createProjectDto: CreateProjectDto): Promise<IProject> {
    const skills = await SkillEntity.findBy({
      title: In(createProjectDto.skills),
    });

    const project = new ProjectEntity();

    project.title = createProjectDto.title;
    project.skills = skills;

    return await project.save();
  }
  async updateProject(
    id: number,
    createProjectDto: CreateProjectDto,
  ): Promise<IProject> {
    const project = await ProjectEntity.findOneBy({
      id,
    });

    const skills = await SkillEntity.findBy({
      title: In(createProjectDto.skills),
    });

    project.title = createProjectDto.title;
    project.skills = skills;

    return await project.save();
  }
}
