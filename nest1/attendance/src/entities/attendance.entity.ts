import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Users, (user) => user.attend)
  users: Users[];

  @Column({ nullable: true }) // Allow null values for signintime
  signintime: number | null;

  @Column()
  signOutTime: Date;

  @Column()
  leaveReason: string ;
}
