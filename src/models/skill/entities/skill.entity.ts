import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ISkill } from '../interfaces/skill.inerface';
import { UserSkillEntity } from '../../user/entities/user-skill.entity';
import { ProjectSkillEntity } from '../../projects/entities/project-skill.entity';
import { UserProjectSkillEntity } from '../../user/entities/user-project-skill.entity';

@Entity('skill')
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

  @OneToMany(() => UserSkillEntity, (userSkill) => userSkill.skill)
  userSkills: UserSkillEntity[];

  @OneToMany(() => ProjectSkillEntity, (projectSkill) => projectSkill.skill)
  projectSkills: ProjectSkillEntity[];

  @OneToMany(
    () => UserProjectSkillEntity,
    (userProjectSkill) => userProjectSkill.skill,
  )
  userProjectSkills: UserProjectSkillEntity[];
}
