import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { SkillEntity } from '../../skill/entities/skill.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';

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
    type: 'text',
    default: '',
  })
  description?: string;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  user: UserEntity;

  @ManyToMany(() => SkillEntity, (skill) => skill.projects, { cascade: true })
  @JoinTable()
  skills: SkillEntity[];
}
