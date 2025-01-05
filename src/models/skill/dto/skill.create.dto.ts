import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SkillCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
