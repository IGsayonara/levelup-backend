import { IProject } from '../../projects/interfaces/project.inerface';
import { ISkill } from '../../skill/interfaces/skill.inerface';

export interface IUser {
  username: string;
  password: string;
  projects?: IProject[];
  skills?: ISkill[];
}
