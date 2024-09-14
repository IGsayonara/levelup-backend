import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SkillSeederService } from './skill.service';
import { SkillEntity } from '../../../models/skill/entities/skill.entity';
import { SkillFactoryModule } from '../../factories/skill/skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity]), SkillFactoryModule],
  providers: [SkillSeederService],
  exports: [SkillSeederService],
})
export class SkillSeederModule {}
