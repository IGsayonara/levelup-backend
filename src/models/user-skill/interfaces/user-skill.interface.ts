import { UserEntity } from '../../user/entities/user.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';

export interface IUserSkill {
  id: number;
  user?: UserEntity;
  skill?: SkillEntity;
  learnedAt: Date;
  description: string;
}
