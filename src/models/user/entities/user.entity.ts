import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { UserSkillEntity } from '../../user-skill/entities/user-skill.entity';
import { UserProfileEntity } from './user-profile.entity';
import { UserProjectEntity } from '../../user-Project/entities/user-project.entity';

@Entity('user')
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @Column({ nullable: true })
  public refreshToken: string | null;

  @OneToMany(() => UserSkillEntity, (userSkill) => userSkill.user)
  userSkills: UserSkillEntity[];

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.user)
  userProjects: UserProjectEntity[];

  @OneToOne(() => UserProfileEntity, (userProfile) => userProfile.user)
  userProfile: UserProfileEntity;
}
