import { ISkill } from '../interfaces/skill.inerface';
import { SkillResponseDto } from '../dto/skill.response.dto';

export class SkillMapper {
  static toDto(skill: ISkill): SkillResponseDto {
    return {
      id: skill.id,
      title: skill.title,
    };
  }
}
