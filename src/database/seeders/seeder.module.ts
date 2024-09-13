import { Seeder } from './seeder';
import { UserSeederModule } from './user.module';
import { PostgrtesDatabaseProviderModule } from '../../providers/database/postgres/postgrtesDatabase.provider.module';
import { Module } from '@nestjs/common';
import { ProjectSeederModule } from './project.module';
import { SkillSeederModule } from './skill.module';

@Module({
  imports: [
    PostgrtesDatabaseProviderModule,
    UserSeederModule,
    ProjectSeederModule,
    SkillSeederModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
