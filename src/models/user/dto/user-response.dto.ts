import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
  IsObject,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

import { UserProjectResponseDto } from './userProject-response.dto';
import { UserSkillResponseDto } from './userSkill-response.dto';

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

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;
}
