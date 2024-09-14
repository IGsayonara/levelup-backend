import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectEntity } from '../../../models/projects/entities/project.entity';
import { ProjectSeederService } from './project.service';
import { ProjectFactoryModule } from '../../factories/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), ProjectFactoryModule],
  providers: [ProjectSeederService],
  exports: [ProjectSeederService],
})
export class ProjectSeederModule {}
