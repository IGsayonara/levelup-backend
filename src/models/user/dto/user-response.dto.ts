import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ISkill } from '../../skill/interfaces/skill.inerface';
import { ProjectResponseDto } from '../../projects/dto/project-response.dto';
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
