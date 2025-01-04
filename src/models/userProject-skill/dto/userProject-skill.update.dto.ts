import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserProjectSkillUpdateDto {
  @ApiProperty({ example: 'Description' })
  @Expose()
  @IsOptional()
  description?: string;
}
