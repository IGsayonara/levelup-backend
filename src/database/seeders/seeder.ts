import { UserSeederService } from './user.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../models/user/entities/user.entity';
import { ProjectEntity } from '../../models/projects/entities/project.entity';
import { ProjectSeederService } from './project.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly userSeederService: UserSeederService,
    private readonly projectSeederService: ProjectSeederService,
  ) {}
  async seed() {
    const users = await this.userSeederService.create();
    const projects = await this.projectSeederService.create();
    await this.addProjectsToUsers(users, projects);
  }
  async addProjectsToUsers(
    users: UserEntity[],
    projects: ProjectEntity[],
  ): Promise<any> {
    console.log(users, projects);
    return Promise.all(
      users.map(async (user, userIndex) => {
        await this.userSeederService.addProject(user, projects[userIndex]);
      }),
    );
  }
}
