import { Module } from '@nestjs/common';
import { UserProjectController } from './userProject.controller';
import { UserProjectService } from './userProject.service';
import { ProjectModule } from '../projects/project.module';

@Module({
  controllers: [UserProjectController],
  providers: [UserProjectService],
  imports: [ProjectModule],
})
export class UserProjectModule {}
