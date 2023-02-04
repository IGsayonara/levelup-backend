import { IProject } from '../../projects/interfaces/project.inerface';
import { ISkill } from '../../skill/interfaces/skill.inerface';

export interface IUser {
  name: string;

  projects: IProject[];

  skills: ISkill[];
}
