import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  bio: string | null;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  phoneNumber: string | null;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  address: string | null;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  dateOfBirth: Date | null;
}
