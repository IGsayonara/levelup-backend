import { UserEntity } from '../entities/user.entity';
import { ProjectEntity } from '../../projects/entities/project.entity';

export interface IUserProject {
  id: number;
  user: UserEntity;
  project: ProjectEntity;
  role: string;
  description: string;
}
