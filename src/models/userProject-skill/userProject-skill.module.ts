import { Module } from '@nestjs/common';
import { UserProjectSkillController } from './userProject-skill.controller';
import { UserProjectSkillService } from './userProject-skill.service';

@Module({
  exports: [UserProjectSkillService],
  controllers: [UserProjectSkillController],
  providers: [UserProjectSkillService],
})
export class UserProjectSkillModule {}
