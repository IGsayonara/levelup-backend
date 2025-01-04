import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty()
  @IsString()
  readonly username?: string;

  @ApiProperty()
  @IsString()
  readonly password?: string;

  @ApiProperty()
  @IsString()
  readonly refreshToken?: string;
}
