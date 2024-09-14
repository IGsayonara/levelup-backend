import { Module } from '@nestjs/common';
import { UserFactoryService } from './user.service';

@Module({
  providers: [UserFactoryService],
  exports: [UserFactoryService],
})
export class UserFactoryModule {}
