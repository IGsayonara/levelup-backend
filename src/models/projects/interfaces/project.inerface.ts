import { ISkill } from '../../skill/interfaces/skill.inerface';

export interface IProject {
  id: number;
  title: string;
  description?: string;
  skills: ISkill[];
  created_at: Date;
  updated_at: Date;
}
