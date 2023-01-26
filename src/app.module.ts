import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './modules/projects/project.module';
import { SkillModule } from './modules/skill/skill.module';
import { LoggerMiddleware } from './common/middleware/user.middleware';

@Module({
  imports: [ProjectModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('projects');
  }
}
