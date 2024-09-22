import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { UserEntity } from './user.entity';

@Entity('user_project')
export class UserProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userProjects)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.userProjects)
  project: ProjectEntity;

  @Column()
  role: string;

  @Column()
  description: string;
}
