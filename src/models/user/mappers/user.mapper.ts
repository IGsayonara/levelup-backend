import { UserEntity } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';
import { UserResponseDTO } from '../dto/user-response.dto';
import { ProjectMapper } from '../../projects/mappers/project.mapper';
import { SkillMapper } from '../../skill/mappers/skill.mapper';

export class UserMapper {
  static toDto(userEntity: IUser): UserResponseDTO {
    return {
      id: userEntity.id,
      username: userEntity.username,
      projects: userEntity.projects.map(ProjectMapper.toDto),
      skills: userEntity.skills.map(SkillMapper.toDto),
    };
  }

  static toEntity(userDto: IUser): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = userDto.id;
    userEntity.username = userDto.username;
    userEntity.projects = userDto.projects.map(ProjectMapper.toEntity);
    userEntity.skills = [];
    return userEntity;
  }
}
