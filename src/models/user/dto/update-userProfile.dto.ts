import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profileImage: string | null;

  @ApiProperty()
  bio: string | null;

  @ApiProperty()
  phoneNumber: string | null;

  @ApiProperty()
  address: string | null;

  @ApiProperty()
  dateOfBirth: Date | null;
}
