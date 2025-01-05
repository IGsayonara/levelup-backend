import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserSkillUpdateDto {
  @ApiProperty({ example: 'Description', required: false })
  @Expose()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  learnedAt?: Date;
}
