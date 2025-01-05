import { Global, Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { FileService } from './file.service';

@Global()
@Module({
  providers: [HashService, FileService],
  exports: [HashService, FileService],
})
export class CommonServicesModule {}
