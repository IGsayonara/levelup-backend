import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { UserModule } from '../user/user.module';
import { ProjectEntity } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ProjectEntity])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
