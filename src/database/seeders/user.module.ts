import { UserEntity } from '../../models/user/entities/user.entity';
import { UserSeederService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
