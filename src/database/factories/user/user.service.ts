import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { UserFakerData } from '../faker.types';

@Injectable()
export class UserFactoryService {
  generateUser(): UserFakerData {
    return {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
  }
}
