import { SkillResponseDto } from '../../skill/dto/skill.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserSkillResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty()
  @Type(() => SkillResponseDto)
  @Expose()
  skill?: SkillResponseDto;

  @ApiProperty()
  @Expose()
  learnedAt: Date;

  @ApiProperty({ example: 'Brief description' })
  @Expose()
  description: string;
}
