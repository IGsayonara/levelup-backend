import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class SkillEntity extends BaseEntity {
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

  @ManyToMany(() => UserEntity, (user) => user.skills)
  users: UserEntity[];

  @ManyToMany(() => ProjectEntity, (project) => project.skills)
  projects: ProjectEntity[];
}
