import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserProfileUpdateDto {
  @ApiProperty({ required: false, example: 'Ihor' })
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false, example: 'Didunik' })
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: false, example: 'test.mail.com' })
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false, example: 'html bio' })
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  bio?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsNotEmpty()
  @IsOptional({})
  dateOfBirth?: Date;
}
