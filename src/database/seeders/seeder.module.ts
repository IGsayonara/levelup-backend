import { Seeder } from './seeder';
import { UserSeederModule } from './user.module';
import { PostgrtesDatabaseProviderModule } from '../../providers/database/postgres/postgrtesDatabase.provider.module';
import { Module } from '@nestjs/common';
import { ProjectSeederModule } from './project.module';

@Module({
  imports: [
    PostgrtesDatabaseProviderModule,
    UserSeederModule,
    ProjectSeederModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
