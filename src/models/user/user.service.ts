import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserService {
  async findOneByUsername(username: string): Promise<UserEntity> {
    return await UserEntity.findOne({
      where: {
        username,
      },
      relations: ['projects', 'skills'],
    });
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await UserEntity.findOne({
      where: {
        id,
      },
      relations: ['projects', 'skills'],
    });
  }

  async updateOne(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await UserEntity.update(id, updateUserDto).then(
      (updateResult) => updateResult.raw[0],
    );
  }

  async addOne(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = new UserEntity();

    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.projects = [];
    user.skills = [];

    await user.save();

    return this.findOneById(user.id);
  }
}
