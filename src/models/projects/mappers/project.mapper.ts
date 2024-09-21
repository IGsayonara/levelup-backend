import { ProjectEntity } from '../entities/project.entity';
import { ProjectResponseDto } from '../dto/project-response.dto';
import { IProject } from '../interfaces/project.inerface';

export class ProjectMapper {
  static toDto(projectEntity: ProjectEntity): ProjectResponseDto {
    return {
      id: projectEntity.id,
      title: projectEntity.title,
      description: projectEntity.description,
      skills: [],
      created_at: projectEntity.created_at.toISOString(),
      updated_at: projectEntity.updated_at.toISOString(),
    };
  }

  static toEntity(projectDto: IProject): ProjectEntity {
    const projectEntity = new ProjectEntity();
    projectEntity.id = projectDto.id;
    projectEntity.title = projectDto.title;
    projectEntity.description = projectDto.description;
    projectEntity.skills = [];
    projectEntity.created_at = new Date(projectDto.created_at);
    projectEntity.updated_at = new Date(projectDto.updated_at);
    return projectEntity;
  }
}
