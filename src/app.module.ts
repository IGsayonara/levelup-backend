import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './modules/projects/project.module';
import { SkillModule } from './modules/skill/skill.module';

@Module({
  imports: [ProjectModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
