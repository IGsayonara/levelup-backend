import { Module } from '@nestjs/common';
import { SkillFactoryService } from './skill.service';

@Module({
  providers: [SkillFactoryService],
  exports: [SkillFactoryService],
})
export class SkillFactoryModule {}
