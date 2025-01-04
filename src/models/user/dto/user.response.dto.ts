import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

import { UserSkillResponseDto } from '../../user-skill/dto/user-skill.response.dto';
import { UserProjectResponseDto } from '../../user-Project/dto/user-project.response.dto';
import * as process from 'node:process';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'noffirl' })
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

  @ApiProperty({ example: 'Ihor' })
  @Expose()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Didunik' })
  @Expose()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'diduniki@gmail.com' })
  @Expose()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: `${process.env.UPLOADS_BASE_URL}/image.jpg` })
  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value && `${process.env.UPLOADS_BASE_URL}/${value}`)
  profileImage?: string;

  @ApiProperty({ example: 'bio in html format' })
  @Expose()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: '+353-(085)-194-55-49' })
  @Expose()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 'Bulgaria, Varna' })
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
