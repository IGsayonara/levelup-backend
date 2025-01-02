import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProjectSkillDto {
  @ApiProperty({ example: 'Description' })
  @Expose()
  description: string;
}
