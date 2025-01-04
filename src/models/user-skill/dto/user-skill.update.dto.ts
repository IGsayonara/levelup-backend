import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserSkillUpdateDto {
  @ApiProperty({ example: 'Description' })
  @Expose()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  learnedAt?: Date;
}
