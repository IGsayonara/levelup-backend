import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class SkillResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'JavaScript' })
  @Expose()
  @IsString()
  title: string;
}
