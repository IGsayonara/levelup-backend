import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectSkillResponseDto } from './project-skill.response.dto';
import { Expose, Transform, Type } from 'class-transformer';

export class ProjectResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Project title' })
  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Project description' })
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

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => value && `${process.env.UPLOADS_BASE_URL}/${value}`)
  image: string;
}
