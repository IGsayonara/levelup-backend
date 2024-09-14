import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../models/user/entities/user.entity';
import { ProjectEntity } from '../../../models/projects/entities/project.entity';
import { SkillEntity } from '../../../models/skill/entities/skill.entity';
import { UserFactoryService } from '../../factories/user/user.service';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userFactoryService: UserFactoryService,
  ) {}

  async create(): Promise<UserEntity[]> {
    return Promise.all(
      new Array(5).fill(null).map(async (_, i) => {
        const user = this.userRepository.create(
          this.userFactoryService.generateUser(),
        );

        await this.userRepository.save(user);

        return user;
      }),
    );
  }

  async addProject(
    user: UserEntity,
    project: ProjectEntity,
  ): Promise<UserEntity> {
    if (!user.projects) {
      user.projects = [];
    }

    user.projects.push(project);

    await this.userRepository.save(user);

    return user;
  }

  async addSkill(user: UserEntity, skill: SkillEntity): Promise<UserEntity> {
    if (!user.skills) {
      user.skills = [];
    }

    user.skills.push(skill);

    await this.userRepository.save(user);

    return user;
  }
}
