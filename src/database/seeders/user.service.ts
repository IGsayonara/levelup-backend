import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../models/user/entities/user.entity';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(): Array<Promise<UserEntity>> {
    return new Array(5).fill(null).map(async (_, i) => {
      const user = this.userRepository.create({
        id: i,
        password: 'test_password',
        username: `User ${i + 1}`,
      });

      await this.userRepository.save(user);

      return user;
    });
  }
}
