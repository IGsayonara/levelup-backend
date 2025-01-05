import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SkillResponseDto } from '../../skill/dto/skill.response.dto';
import { IsNumber } from 'class-validator';

export class UserProjectSkillResponseDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty()
  @Type(() => SkillResponseDto)
  @Expose()
  skill: SkillResponseDto;

  @ApiProperty({ example: 'Brief description' })
  @Expose()
  description: string;
}
