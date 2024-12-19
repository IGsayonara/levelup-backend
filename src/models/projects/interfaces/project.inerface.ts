import { IProjectSkill } from './project-skill.interface';

export interface IProject {
  id: number;
  title: string;
  description?: string;
  shortDescription?: string;
  projectSkills: IProjectSkill[];
  createdAt: Date;
  updatedAt: Date;
}
