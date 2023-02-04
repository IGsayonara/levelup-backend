import { Injectable, NotFoundException } from '@nestjs/common';
import { IProject } from './interfaces/project.inerface';
import { ProjectEntity } from './entities/project.entity';
import { In, InsertResult } from 'typeorm';
import {
  CreatePrimaryProjectDto,
  CreateProjectDto,
  Skills,
} from './dto/create-project.dto';
import { SkillEntity } from '../skill/entities/skill.entity';
import {
  UpdatePrimaryProjectDto,
  UpdateProjectDto,
} from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  async getProjects(page = 0, limit = 4): Promise<IProject[]> {
    return await ProjectEntity.find({
      relations: ['skills'],
      skip: limit * page,
      take: limit,
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

  async addProject(
    createPrimaryProjectDto: CreatePrimaryProjectDto,
  ): Promise<number> {
    return await ProjectEntity.insert(createPrimaryProjectDto).then(
      (result) => {
        return result.raw[0].id;
      },
    );
  }
  async updateProject(
    id: number,
    updatePrimaryProjectDto: UpdatePrimaryProjectDto,
  ): Promise<void> {
    await ProjectEntity.update(id, updatePrimaryProjectDto);
  }

  async updateProjectSkills(id: number, skillsIds: Skills): Promise<void> {
    if (!skillsIds) return;
    const project = await ProjectEntity.findOne({
      where: {
        id,
      },
    });

    const skills = await SkillEntity.findBy({
      id: In(skillsIds),
    });

    project.skills = skills;

    await project.save();
  }
}
