import { UserEntity } from '../entities/user.entity';

import { FindOptionsWhere } from 'typeorm';
import { UserProfileEntity } from '../entities/user-profile.entity';
import { NotFoundException } from '@nestjs/common';

export class UserProfileService {
  async updateOne(
    findOptionsWhere: FindOptionsWhere<UserEntity>,
    updateUserProfileDto: Partial<UserProfileEntity>,
  ): Promise<boolean> {
    const user = await UserEntity.createQueryBuilder('user')
      .leftJoinAndSelect('user.userProfile', 'userProfile')
      .where(findOptionsWhere)
      .getOne();

    if (!user) {
      throw new NotFoundException();
    }

    await UserProfileEntity.createQueryBuilder('userProfile')
      .update()
      .set(updateUserProfileDto)
      .where({ id: user.userProfile.id })
      .execute();

    return true;
  }
}
