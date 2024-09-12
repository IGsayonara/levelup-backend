import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectEntity } from '../../models/projects/entities/project.entity';
import { ProjectSeederService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectSeederService],
  exports: [ProjectSeederService],
})
export class ProjectSeederModule {}
