import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { UserProjectResponseDto } from './userProject-response.dto';
import { UserSkillResponseDto } from './userSkill-response.dto';
import { Expose, Type } from 'class-transformer';

export class UserResponseDTO {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @Type(() => UserProjectResponseDto)
  @Expose()
  userProjects?: UserProjectResponseDto[];

  @ApiProperty()
  @Type(() => UserSkillResponseDto)
  @Expose()
  userSkills?: UserSkillResponseDto[];
}
