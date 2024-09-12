import { Seeder } from './seeder';
import { UserSeederModule } from './user.module';
import { PostgrtesDatabaseProviderModule } from '../../providers/database/postgres/postgrtesDatabase.provider.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PostgrtesDatabaseProviderModule, UserSeederModule],
  providers: [Seeder],
})
export class SeederModule {}
