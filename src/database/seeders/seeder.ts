import { UserSeederService } from './user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Seeder {
  constructor(private readonly userSeederService: UserSeederService) {}
  async seed() {
    await this.users()
      .then((completed) => {
        console.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        console.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async users() {
    return await Promise.all(this.userSeederService.create())
      .then((createdLanguages) => {
        console.log(createdLanguages);
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
