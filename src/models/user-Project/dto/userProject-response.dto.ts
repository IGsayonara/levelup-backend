import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectResponseDto } from '../../projects/dto/project-response.dto';
import { UserProjectSkillResponseDto } from '../../userProject-skill/dto/userProjectSkill-response.dto';

export class UserProjectResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ type: ProjectResponseDto })
  @Expose()
  @Type(() => ProjectResponseDto)
  project: ProjectResponseDto;

  @ApiProperty()
  @Expose()
  role: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty({ type: UserProjectSkillResponseDto, isArray: true })
  @Type(() => UserProjectSkillResponseDto)
  @Expose()
  skills: UserProjectSkillResponseDto[];
}
