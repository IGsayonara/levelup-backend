import { SkillResponseDto } from '../../skill/dto/skill-response.dto';

export class UserSkillResponseDto {
  id: number;
  skill: SkillResponseDto;
  learnedAt: Date;
  description: string;
}
