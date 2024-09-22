import { IUserSkill } from './user-skill.interface';
import { IUserProject } from './user-project.interface';

export interface IUser {
  id: number;
  username: string;
  password: string;
  projects?: IUserProject[];
  skills?: IUserSkill[];
  refreshToken: string;
}
