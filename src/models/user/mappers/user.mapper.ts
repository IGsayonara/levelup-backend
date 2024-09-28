import { IUser } from '../interfaces/user.interface';

import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static entityToInterface(user: UserEntity): IUser {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      refreshToken: user.refreshToken,
      userProjects: user.userProjects,
      userSkills: user.userSkills,
      firstName: user.userProfile?.firstName,
      lastName: user.userProfile?.lastName,
      email: user.userProfile?.email,
      profileImage: user.userProfile?.profileImage,
      bio: user.userProfile?.bio,
      socialLinks: user.userProfile?.socialLinks,
      phoneNumber: user.userProfile?.phoneNumber,
      address: user.userProfile?.address,
      dateOfBirth: user.userProfile?.dateOfBirth,
    };
  }
}
