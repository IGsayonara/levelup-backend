import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from '../../../models/skill/entities/skill.entity';
import { SkillFactoryService } from '../../factories/skill/skill.service';

@Injectable()
export class SkillSeederService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
    private readonly skillFactoryService: SkillFactoryService,
  ) {}

  async create(): Promise<SkillEntity[]> {
    return Promise.all(
      new Array(5).fill(null).map(async (_, i) => {
        const skill = this.skillRepository.create(
          this.skillFactoryService.generateSkill(),
        );

        await this.skillRepository.save(skill);

        return skill;
      }),
    );
  }
}
