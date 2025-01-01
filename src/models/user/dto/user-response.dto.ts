import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Expose, Type } from 'class-transformer';

import { UserSkillResponseDto } from '../../user-skill/dto/user-skill.response.dto';
import { UserProjectResponseDto } from '../../user-Project/dto/userProject-response.dto';

export class UserResponseDTO {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  readonly username: string;

  @ApiProperty({ type: UserProjectResponseDto, isArray: true })
  @Type(() => UserProjectResponseDto)
  @Expose()
  userProjects?: UserProjectResponseDto[];

  @ApiProperty({ type: UserSkillResponseDto, isArray: true })
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
