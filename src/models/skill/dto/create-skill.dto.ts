import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
