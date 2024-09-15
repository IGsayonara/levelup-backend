import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IProject } from '../../projects/interfaces/project.inerface';
import { ISkill } from '../../skill/interfaces/skill.inerface';

export class UserResponseDTO {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  readonly projects?: IProject[];

  @ApiProperty()
  readonly skills?: ISkill[];
}
