import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_profile')
export class UserProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  profileImage: string | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'text', nullable: true })
  phoneNumber: string | null;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date | null;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
