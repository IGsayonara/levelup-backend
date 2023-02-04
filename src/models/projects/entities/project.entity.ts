import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SkillEntity } from '../../skill/entities/skill.entity';

@Entity()
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
    default: '',
  })
  description?: string;

  @ManyToMany(() => SkillEntity, (skill) => skill.projects, { cascade: true })
  @JoinTable()
  skills: SkillEntity[];
}
