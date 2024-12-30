import { SkillEntity } from '../../../models/skill/entities/skill.entity';
import { ProjectEntity } from '../../../models/projects/entities/project.entity';
import { UserEntity } from '../../../models/user/entities/user.entity';
import { UserSkillEntity } from '../../../models/user-skill/entities/user-skill.entity';
import { ProjectSkillEntity } from '../../../models/projects/entities/project-skill.entity';
import { UserProjectSkillEntity } from '../../../models/userProject-skill/entities/user-project-skill.entity';
import { UserProfileEntity } from '../../../models/user/entities/user-profile.entity';
import { UserProjectEntity } from 'src/models/user-Project/entities/user-project.entity';

export const postgresEntities = [
  SkillEntity,
  ProjectEntity,
  UserEntity,
  UserSkillEntity,
  UserProjectEntity,
  ProjectSkillEntity,
  UserProjectSkillEntity,
  UserProfileEntity,
];
