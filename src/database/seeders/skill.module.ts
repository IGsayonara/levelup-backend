import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SkillSeederService } from './skill.service';
import { SkillEntity } from '../../models/skill/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  providers: [SkillSeederService],
  exports: [SkillSeederService],
})
export class SkillSeederModule {}
