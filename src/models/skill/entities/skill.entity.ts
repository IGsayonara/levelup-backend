import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => UserEntity, (user) => user.skills)
  user: UserEntity;

  @ManyToMany(() => ProjectEntity, (project) => project.skills)
  projects: ProjectEntity[];
}
