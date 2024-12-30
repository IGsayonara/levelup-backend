import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './user.service';
import { UserProfileController } from './controllers/user-profile.controller';

@Module({
  exports: [UserService],
  controllers: [UserController, UserProfileController],
  providers: [UserService],
})
export class UserModule {}
