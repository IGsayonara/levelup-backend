import { Module } from '@nestjs/common';
import { ProjectFactoryService } from './project.service';

@Module({
  providers: [ProjectFactoryService],
  exports: [ProjectFactoryService],
})
export class ProjectFactoryModule {}
