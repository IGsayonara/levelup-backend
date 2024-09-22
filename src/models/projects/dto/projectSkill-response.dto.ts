import { SkillResponseDto } from '../../skill/dto/skill-response.dto';

export class ProjectSkillResponseDto {
  id: number;
  skill: SkillResponseDto;
  description: string;
}
