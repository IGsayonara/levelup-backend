import { ISkill } from '../../skill/interfaces/skill.inerface';

export interface IProject {
  title: string;
  description?: string;
  skills: ISkill[];
}
