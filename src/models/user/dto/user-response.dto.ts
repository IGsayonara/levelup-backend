import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ISkill } from '../../skill/interfaces/skill.inerface';
import { ProjectResponseDto } from '../../projects/dto/project-response.dto';

export class UserResponseDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  readonly projects?: ProjectResponseDto[];

  @ApiProperty()
  readonly skills?: ISkill[];
}
