import { Injectable } from '@nestjs/common';
import { IProject } from './project.inerface';

@Injectable()
export class ProjectService {
  getProjects(): IProject[] {
    return [
      {
        title: 'test project',
        skills: [{ title: 'typescript' }, { title: 'vue' }, { title: 'nest' }],
      },
    ];
  }

  getProject(id): IProject {
    return {
      title: `Project ${id}`,
      skills: [{ title: 'typescript' }, { title: 'vue' }, { title: 'nest' }],
    };
  }
}
