import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SkillResponseDto } from '../../skill/dto/skill-response.dto';

export class UserProjectSkillResponseDto {
  @ApiProperty({ example: 1 })
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
