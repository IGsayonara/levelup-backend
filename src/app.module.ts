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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProjectModule,
    SkillModule,
    PostgrtesDatabaseProviderModule,
    UserModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve files from 'uploads' directory
      serveRoot: '/uploads', // URL prefix for serving static files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
