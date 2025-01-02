import { SkillResponseDto } from '../../skill/dto/skill-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ProjectSkillResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ type: SkillResponseDto })
  @Type(() => SkillResponseDto)
  @Expose()
  skill: SkillResponseDto;

  @ApiProperty({ example: 'description' })
  @Expose()
  description: string;
}
