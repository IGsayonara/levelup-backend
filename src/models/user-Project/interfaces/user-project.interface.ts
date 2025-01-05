import { UserEntity } from '../../user/entities/user.entity';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { IUserProjectSkill } from '../../userProject-skill/interfaces/user-project-skill.interface';

export interface IUserProject {
  id: number;
  user: UserEntity;
  project: ProjectEntity;
  role: string;
  description: string;
  skills: IUserProjectSkill[];
}
