import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserProfileUpdateDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  bio?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsOptional({})
  dateOfBirth?: Date;
}
