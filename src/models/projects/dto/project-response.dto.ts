import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectSkillResponseDto } from './projectSkill-response.dto';
import { Expose, Type } from 'class-transformer';

export class ProjectResponseDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: ProjectSkillResponseDto, isArray: true })
  @Expose()
  @Type(() => ProjectSkillResponseDto)
  @IsArray()
  projectSkills: ProjectSkillResponseDto[];

  @ApiProperty()
  @Expose()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @IsDateString()
  updatedAt: Date;
}
