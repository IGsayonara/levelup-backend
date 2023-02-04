import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type Skills = number[];

export class CreatePrimaryProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;
}

export class CreateProjectDto extends CreatePrimaryProjectDto {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly skills?: Skills;
}
