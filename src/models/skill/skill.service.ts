import { Injectable, NotFoundException } from '@nestjs/common';
import { ISkill } from './interfaces/skill.inerface';
import { SkillEntity } from './entities/skill.entity';
import { In, InsertResult } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ProjectEntity } from '../projects/entities/project.entity';

@Injectable()
export class SkillService {
  async getSkills(): Promise<ISkill[]> {
    return await SkillEntity.find();
  }
  async getSkill(id: number): Promise<ISkill> {
    const skill = await SkillEntity.findOne({
      where: {
        id,
      },
      relations: ['projects'],
    });

    if (skill === null) {
      throw new NotFoundException({
        message: `Can't find any skill with id: ${id}`,
      });
    }

    return skill;
  }
  async addSkill(createSkillDto: CreateSkillDto): Promise<ISkill> {
    const skill = new SkillEntity();

    skill.title = createSkillDto.title;

    return await skill.save();
  }
}
