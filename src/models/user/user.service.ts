import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';

import { FindOptionsWhere } from 'typeorm';
import { UserMapper } from './mappers/user.mapper';
import { UserProfileEntity } from './entities/user-profile.entity';
import { NotFoundException } from '@nestjs/common';
import { UserProjectEntity } from './entities/user-project.entity';

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
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return await UserEntity.update(findOptionsWhere, updateUserDto).then(
      (updateResult) => updateResult.raw[0],
    );
  }

  async updateProfile(
    findOptionsWhere: FindOptionsWhere<UserEntity>,
    updateUserProfileDto: Partial<UserProfileEntity>,
  ): Promise<IUser | null> {
    const user = await UserEntity.createQueryBuilder('user')
      .leftJoinAndSelect('user.userProfile', 'userProfile')
      .where(findOptionsWhere)
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }

    await UserProfileEntity.createQueryBuilder('userProfile')
      .update()
      .set(updateUserProfileDto)
      .where({ id: user.userProfile.id })
      .execute();

    return this.findOne(findOptionsWhere);
  }

  async updateProfilePicture(
    findOptionsWhere: FindOptionsWhere<UserEntity>,
    path: string,
  ): Promise<IUser> {
    const user = await UserEntity.createQueryBuilder('user')
      .leftJoinAndSelect('user.userProfile', 'userProfile')
      .where(findOptionsWhere)
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }

    await UserProfileEntity.createQueryBuilder('userProfile')
      .update()
      .set({ profileImage: path })
      .where({ id: user.userProfile.id })
      .execute();

    return this.findOne(findOptionsWhere);
  }

  async addOne(createUserDto: CreateUserDto): Promise<Omit<IUser, 'password'>> {
    const user = new UserEntity();

    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.userProjects = [];
    user.userSkills = [];

    await user.save();

    return this.findOne({ id: user.id });
  }

  async addProjectToUser(userId: number, projectId: number): Promise<void> {
    await UserProjectEntity.createQueryBuilder()
      .insert()
      .into(UserProjectEntity)
      .values({
        user: userId as any,
        project: projectId as any,
        role: 'developer',
        description: `meow`,
      })
      .execute();
  }
}
