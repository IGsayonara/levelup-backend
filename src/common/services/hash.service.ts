import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  hash(value: string) {
    return value;
  }

  compare(value: string, hashed: string) {
    return value === hashed;
  }
}
