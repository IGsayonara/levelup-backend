import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SkillEntity } from '../../skill/entities/skill.entity';
import { UserEntity } from './user.entity';

@Entity('user_skill')
export class UserSkillEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userSkills)
  user: UserEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.userSkills)
  skill: SkillEntity;

  @Column()
  learnedAt: Date;

  @Column()
  description: string;
}
