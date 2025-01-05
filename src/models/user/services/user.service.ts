import { UserEntity } from '../entities/user.entity';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserUpdateDto } from '../dto/user.update.dto';
import { IUser } from '../interfaces/user.interface';

import { FindOptionsWhere } from 'typeorm';
import { UserMapper } from '../mappers/user.mapper';

export class UserService {
  async findOne(
    findOptionsWhere: FindOptionsWhere<UserEntity>,
  ): Promise<IUser | null> {
    return UserMapper.entityToInterface(
      await UserEntity.createQueryBuilder('user')
        .leftJoinAndSelect('user.userProjects', 'userProject')
        .leftJoinAndSelect('userProject.project', 'project')
        .leftJoinAndSelect('user.userProfile', 'userProfile')
        .leftJoinAndSelect('user.userSkills', 'userSkill')
        .leftJoinAndSelect('userSkill.skill', 'skill')
        .leftJoinAndSelect('project.projectSkills', 'projectSkill')
        .leftJoinAndSelect('projectSkill.skill', 'projectSkillEntity')
        .leftJoinAndSelect('userProject.skills', 'userProjectSkills')
        .leftJoinAndSelect('userProjectSkills.skill', 'userProjectSkillEntity')
        .where(findOptionsWhere)
        .getOne(),
    );
  }

  async updateOne(
    findOptionsWhere: FindOptionsWhere<UserEntity>,
    updateUserDto: UserUpdateDto,
  ): Promise<IUser> {
    return await UserEntity.update(findOptionsWhere, updateUserDto).then(
      (updateResult) => updateResult.raw[0],
    );
  }

  async addOne(createUserDto: UserCreateDto): Promise<Omit<IUser, 'password'>> {
    const user = new UserEntity();

    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.userProjects = [];
    user.userSkills = [];

    await user.save();

    return this.findOne({ id: user.id });
  }
}
