import { IUserProject } from '../interfaces/user-project.interface';
import { ISkill } from '../../skill/interfaces/skill.inerface';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserProjectResponseDto } from './userProject-response.dto';
import { SkillResponseDto } from '../../skill/dto/skill-response.dto';

export class UserProjectSkillResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Type(() => UserProjectResponseDto)
  @Expose()
  userProject: UserProjectResponseDto;

  @ApiProperty()
  @Type(() => SkillResponseDto)
  @Expose()
  skill: SkillResponseDto;

  @ApiProperty()
  @Expose()
  description: string;
}
