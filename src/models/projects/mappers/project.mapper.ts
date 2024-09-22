import { ProjectResponseDto } from '../dto/project-response.dto';
import { IProject } from '../interfaces/project.inerface';
import { NotImplementedException } from '@nestjs/common';

export class ProjectMapper {
  static toDto(project: IProject): ProjectResponseDto {
    throw new NotImplementedException();
  }
}
