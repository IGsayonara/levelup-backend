import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { UserProjectSkillEntity } from '../../userProject-skill/entities/user-project-skill.entity';

@Entity('user_project')
export class UserProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userProjects)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.userProjects)
  project: ProjectEntity;

  @OneToMany(
    () => UserProjectSkillEntity,
    (userProjectSkill) => userProjectSkill.userProject,
    { cascade: true, onDelete: 'CASCADE' },
  )
  skills: UserProjectSkillEntity[];

  @Column()
  role: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  shortDescription?: string;
}
