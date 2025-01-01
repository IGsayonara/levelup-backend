import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './models/projects/project.module';
import { SkillModule } from './models/skill/skill.module';
import { PostgrtesDatabaseProviderModule } from './providers/database/postgres/postgrtesDatabase.provider.module';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserProjectModule } from './models/user-Project/userProject.module';
import { UserProjectSkillModule } from './models/userProject-skill/userProject-skill.module';
import { UserSkillModule } from './models/user-skill/user-skill.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProjectModule,
    UserProjectModule,
    SkillModule,
    UserSkillModule,
    UserProjectSkillModule,
    PostgrtesDatabaseProviderModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
