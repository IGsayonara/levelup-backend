import { UserEntity } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectResponseDto } from '../../projects/dto/project-response.dto';
import { UserProjectSkillResponseDto } from '../../userProject-skill/dto/userProjectSkill-response.dto';

export class UserProjectResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  user: UserEntity;

  @ApiProperty()
  @Expose()
  @Type(() => ProjectResponseDto)
  project: ProjectResponseDto;

  @ApiProperty()
  @Expose()
  role: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Type(() => UserProjectSkillResponseDto)
  @Expose()
  skills: UserProjectSkillResponseDto[];
}
