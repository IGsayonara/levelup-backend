import { SkillEntity } from '../../../models/skill/entities/skill.entity';
import { ProjectEntity } from '../../../models/projects/entities/project.entity';
import { UserEntity } from '../../../models/user/entities/user.entity';
import { UserSkillEntity } from '../../../models/user/entities/user-skill.entity';
import { UserProjectEntity } from '../../../models/user/entities/user-project.entity';
import { ProjectSkillEntity } from '../../../models/projects/entities/project-skill.entity';

export const postgresEntities = [
  SkillEntity,
  ProjectEntity,
  UserEntity,
  UserSkillEntity,
  UserProjectEntity,
  ProjectSkillEntity,
];
