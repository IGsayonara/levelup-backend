import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { UserProjectResponseDto } from './userProject-response.dto';
import { UserSkillResponseDto } from './userSkill-response.dto';

export class UserResponseDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  readonly userProjects?: UserProjectResponseDto[];

  @ApiProperty()
  readonly userSkills?: UserSkillResponseDto[];
}
