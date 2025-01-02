import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateUserSkillDto {
  @ApiProperty({ example: 'Description' })
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  learnedAt: Date;
}
