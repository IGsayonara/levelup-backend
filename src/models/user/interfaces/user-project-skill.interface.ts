import { ISkill } from '../../skill/interfaces/skill.inerface';
import { IUserProject } from './user-project.interface';

export interface IUserProjectSkill {
  id: number;

  userProject: IUserProject;

  skill: ISkill;

  description: string;
}
