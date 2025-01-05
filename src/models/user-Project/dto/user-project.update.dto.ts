import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserProjectUpdateDto {
  @ApiProperty({ example: 'Back-End', required: false })
  @Expose()
  @IsOptional()
  role?: string;

  @ApiProperty({ example: 'Brief description', required: false })
  @Expose()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Brief description', required: false })
  @Expose()
  @IsOptional()
  shortDescription?: string;
}
