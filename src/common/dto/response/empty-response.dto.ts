import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class EmptyResponseDto {
  @ApiProperty({ example: HttpStatus.NO_CONTENT })
  status: HttpStatus;
}
