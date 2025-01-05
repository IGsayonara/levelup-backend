import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectUpdateDto {
  @ApiProperty({ example: 'Crypto Wallet', required: false })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @ApiPropertyOptional({
    example: 'Amazing de-fi application bla bla bla',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({ example: 'Amazing de-fi application...' })
  @IsOptional()
  @IsString()
  readonly shortDescription?: string;
}
