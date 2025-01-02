import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'noffirl' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'test22848' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
