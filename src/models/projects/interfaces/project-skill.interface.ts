import { ProjectEntity } from '../entities/project.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';

export interface IProjectSkill {
  id: number;
  project: ProjectEntity;
  skill: SkillEntity;
  description: string;
}
