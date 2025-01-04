import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserProjectSkillCreateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Expose()
  userProjectId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Expose()
  skillId: number;
}
