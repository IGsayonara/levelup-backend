import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';
import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => SkillEntity, (skill) => skill.user, { cascade: true })
  @JoinColumn()
  @IsOptional()
  skills: SkillEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.user, { cascade: true })
  @JoinColumn()
  @IsOptional()
  projects: ProjectEntity[];
}
