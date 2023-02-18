import { UserEntity } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { In } from 'typeorm';
import { ProjectEntity } from '../projects/entities/project.entity';

export class UserService {
  async getUser(username): Promise<UserEntity> {
    return await UserEntity.findOne({
      where: {
        username,
      },
      relations: ['projects', 'skills'],
    });
  }
  async addUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = new UserEntity();

    const projects = await ProjectEntity.find({
      where: {
        id: In(createUserDto.projects),
      },
      relations: {
        skills: true,
      },
    });

    const skillsInProjects = projects.reduce((currentSkills, project) => {
      currentSkills.push(...project.skills);
      return currentSkills;
    }, []);

    const skills = [...new Set(skillsInProjects)];

    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.projects = projects;
    user.skills = skills;

    const saved = await user.save();
    return saved;
  }
}
