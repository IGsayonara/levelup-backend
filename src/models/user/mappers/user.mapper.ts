import { IUser } from '../interfaces/user.interface';
import { UserResponseDTO } from '../dto/user-response.dto';
import { ProjectMapper } from '../../projects/mappers/project.mapper';
import { SkillMapper } from '../../skill/mappers/skill.mapper';
import * as assert from 'node:assert';
import { NotImplementedException } from '@nestjs/common';

export class UserMapper {
  static toDto(user: IUser): UserResponseDTO {
    throw new NotImplementedException();
  }
}
