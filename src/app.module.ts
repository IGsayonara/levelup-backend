import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './models/projects/project.module';
import { SkillModule } from './models/skill/skill.module';
import { PostgrtesDatabaseProviderModule } from './providers/database/postgres/postgrtesDatabase.provider.module';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    ProjectModule,
    SkillModule,
    PostgrtesDatabaseProviderModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
