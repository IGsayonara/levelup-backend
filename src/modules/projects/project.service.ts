import { Injectable } from '@nestjs/common';
import { IProject } from './project.inerface';

@Injectable()
export class ProjectService {
  getProjects(): IProject[] {
    return [
      {
        title: 'test project',
        skills: ['typescript', 'vue', 'nest'],
      },
    ];
  }
}
