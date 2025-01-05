import { Injectable, NotFoundException } from '@nestjs/common';
import { ISkill } from './interfaces/skill.inerface';
import { SkillEntity } from './entities/skill.entity';
import { SkillCreateDto } from './dto/skill.create.dto';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class SkillService {
  async getSkills(): Promise<ISkill[]> {
    return await SkillEntity.find();
  }
  async findOne(
    findOptionsWhere: FindOptionsWhere<SkillEntity | null>,
  ): Promise<ISkill> {
    return await SkillEntity.findOne({
      where: findOptionsWhere,
    });
  }
}
