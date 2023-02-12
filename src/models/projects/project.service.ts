import { Injectable, NotFoundException } from '@nestjs/common';
import { IProject } from './interfaces/project.inerface';
import { ProjectEntity } from './entities/project.entity';
import { In, InsertResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { SkillEntity } from '../skill/entities/skill.entity';
import { UserService } from '../user/user.service';
import { IUser } from '../user/interfaces/user.interface';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly userService: UserService) {}
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
