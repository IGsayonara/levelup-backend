import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDTO } from './dto/user-response.dto';

export class UserService {
  async findOne(username: string): Promise<UserEntity> {
    return await UserEntity.findOne({
      where: {
        username,
      },
      relations: ['projects', 'skills'],
    });
  }

  async addOne(createUserDto: CreateUserDto): Promise<UserResponseDTO> {
    const user = new UserEntity();

    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.projects = [];
    user.skills = [];

    await user.save();

    const { password: _password, ...result } = user;
    return result;
  }
}
