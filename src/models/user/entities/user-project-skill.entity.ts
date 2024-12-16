import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserProjectEntity } from './user-project.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';

@Entity('user_project_skill')
@Unique(['userProject', 'skill'])
export class UserProjectSkillEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProjectEntity, (userProject) => userProject.skills)
  userProject: UserProjectEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.userProjectSkills)
  skill: SkillEntity;

  @Column()
  description: string;
}
