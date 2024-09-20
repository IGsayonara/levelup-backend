import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}
  async hash(value: string) {
    const valueToHash =
      value.length > 72
        ? crypto.createHash('sha256').update(value).digest('hex')
        : value;

    return await bcrypt.hash(
      valueToHash,
      +this.configService.get('BCRYPT_SALT'),
    );
  }

  async compare(value: string, hashed: string) {
    const valueToCompare =
      value.length > 72
        ? crypto.createHash('sha256').update(value).digest('hex')
        : value;
    return await bcrypt.compare(valueToCompare, hashed);
  }
}
