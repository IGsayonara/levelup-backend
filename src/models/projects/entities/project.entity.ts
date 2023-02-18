import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SkillEntity } from '../../skill/entities/skill.entity';
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
