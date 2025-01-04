import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  @IsString()
  readonly username?: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly password?: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly refreshToken?: string;
}
