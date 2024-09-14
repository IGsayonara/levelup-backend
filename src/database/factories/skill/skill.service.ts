import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SkillFakerData } from '../faker.types';

@Injectable()
export class SkillFactoryService {
  generateSkill(): SkillFakerData {
    return {
      title: faker.company.name(),
    };
  }
}
