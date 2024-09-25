import { SkillResponseDto } from '../../skill/dto/skill-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserSkillResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  skill: SkillResponseDto;

  @ApiProperty()
  @Expose()
  learnedAt: Date;

  @ApiProperty()
  @Expose()
  description: string;
}
