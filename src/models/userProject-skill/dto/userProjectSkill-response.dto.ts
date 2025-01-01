import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SkillResponseDto } from '../../skill/dto/skill-response.dto';

export class UserProjectSkillResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Type(() => SkillResponseDto)
  @Expose()
  skill: SkillResponseDto;

  @ApiProperty()
  @Expose()
  description: string;
}
