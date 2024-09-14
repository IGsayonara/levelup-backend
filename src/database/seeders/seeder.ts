import { UserSeederService } from './user/user.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../models/user/entities/user.entity';
import { ProjectEntity } from '../../models/projects/entities/project.entity';
import { ProjectSeederService } from './project/project.service';
import { SkillSeederService } from './skill/skill.service';
import { SkillEntity } from '../../models/skill/entities/skill.entity';

@Injectable()
export class Seeder {
  constructor(
    private readonly userSeederService: UserSeederService,
    private readonly projectSeederService: ProjectSeederService,
    private readonly skillSeederService: SkillSeederService,
  ) {}
  async seed() {
    const users = await this.userSeederService.create();
    const projects = await this.projectSeederService.create();
    const skills = await this.skillSeederService.create();

    await this.addSkillsToProjects(projects, skills);
    await this.addProjectsToUsers(users, projects);
    await this.addSkillsToUsers(users, skills);
  }

  async addSkillsToProjects(projects: ProjectEntity[], skills: SkillEntity[]) {
    return Promise.all(
      projects.map(async (project) => {
        await this.projectSeederService.addSkills(project, skills);
      }),
    );
  }

  async addProjectsToUsers(
    users: UserEntity[],
    projects: ProjectEntity[],
  ): Promise<any> {
    return Promise.all(
      users.map(async (user, userIndex) => {
        await this.userSeederService.addProject(user, projects[userIndex]);
      }),
    );
  }

  async addSkillsToUsers(
    users: UserEntity[],
    skills: SkillEntity[],
  ): Promise<any> {
    return Promise.all(
      users.map(async (user, userIndex) => {
        await this.userSeederService.addSkill(user, skills[userIndex]);
      }),
    );
  }
}
