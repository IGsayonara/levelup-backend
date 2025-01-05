import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ProjectSkillEntity } from './project-skill.entity';
import { UserProjectEntity } from '../../user-Project/entities/user-project.entity';

@Entity('project')
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    unique: true,
  })
  title: string;

  @Column({
    type: 'text',
    default: '',
  })
  description?: string;

  @Column({
    type: 'text',
    default: '',
  })
  shortDescription: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @OneToMany(() => ProjectSkillEntity, (projectSkill) => projectSkill.project)
  projectSkills: ProjectSkillEntity[];

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.project)
  userProjects: UserProjectEntity[];

  @Column({
    type: 'text',
    default: '',
    nullable: true,
  })
  public image: string;
}
