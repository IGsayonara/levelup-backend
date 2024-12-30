import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SkillEntity } from '../../skill/entities/skill.entity';
import { UserProjectEntity } from '../../user-Project/entities/user-project.entity';

@Entity('user_project_skill')
@Unique(['userProject', 'skill'])
export class UserProjectSkillEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProjectEntity, (userProject) => userProject.skills, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userProject: UserProjectEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.userProjectSkills)
  skill: SkillEntity;

  @Column()
  description: string;
}
