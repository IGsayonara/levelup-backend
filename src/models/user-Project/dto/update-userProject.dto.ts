import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateUserProjectDto {
  @ApiProperty({ example: 'Back-End' })
  @Expose()
  role: string;

  @ApiProperty({ example: 'Brief description' })
  @Expose()
  description?: string;

  @ApiProperty({ example: 'Brief description' })
  @Expose()
  shortDescription?: string;
}
