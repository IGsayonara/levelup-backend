import { ProjectEntity } from './project.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project_skill')
export class ProjectSkillEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProjectEntity, (project) => project.projectSkills)
  project: ProjectEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.projectSkills)
  skill: SkillEntity;

  @Column()
  description: string;
}
