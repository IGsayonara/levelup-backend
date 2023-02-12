import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
