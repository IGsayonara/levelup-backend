import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserProfileController } from './controllers/user-profile.controller';
import { UserProfileService } from './services/user-profile.service';

@Module({
  exports: [UserService],
  controllers: [UserController, UserProfileController],
  providers: [UserService, UserProfileService],
})
export class UserModule {}
