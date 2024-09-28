import { IUserSkill } from './user-skill.interface';
import { IUserProject } from './user-project.interface';

export interface IUser {
  id: number;
  username: string;
  password: string;
  userProjects?: IUserProject[];
  userSkills?: IUserSkill[];
  refreshToken: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  socialLinks?: { [key: string]: string };
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
}
