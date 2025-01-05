import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectCreateDto {
  @ApiProperty({ example: 'Crypto Wallet' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiPropertyOptional({ example: 'Amazing de-fi application bla bla bla' })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({ example: 'Amazing de-fi application...' })
  @IsOptional()
  @IsString()
  readonly shortDescription?: string;
}
