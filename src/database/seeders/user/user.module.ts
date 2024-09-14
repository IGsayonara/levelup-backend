import { UserEntity } from '../../../models/user/entities/user.entity';
import { UserSeederService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserFactoryModule } from '../../factories/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserFactoryModule],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
