import { IProject } from './project.inerface';
import { ISkill } from '../../skill/interfaces/skill.inerface';

export interface IProjectSkill {
  id: number;
  project: IProject;
  skill: ISkill;
  description: string;
}
