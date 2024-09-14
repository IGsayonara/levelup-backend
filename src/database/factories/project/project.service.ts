import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { ProjectFakerData } from '../faker.types';

@Injectable()
export class ProjectFactoryService {
  generateProject(): ProjectFakerData {
    return {
      title: faker.company.name(),
      description: faker.lorem.sentence(),
    };
  }
}
