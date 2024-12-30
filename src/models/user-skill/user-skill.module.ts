import { Module } from '@nestjs/common';
import { UserSkillController } from './user-skill.controller';
import { UserSkillService } from './user-skill.service';

@Module({
  exports: [UserSkillService],
  controllers: [UserSkillController],
  providers: [UserSkillService],
})
export class UserSkillModule {}
