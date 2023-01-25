import { Injectable } from '@nestjs/common';
import { ISkill } from './skill.inerface';

@Injectable()
export class SkillService {
  getSkills(): ISkill[] {
    return [
      {
        title: 'test project',
      },
    ];
  }
  getSkill(id): ISkill {
    return {
      title: `skill ${id}`,
    };
  }
}
