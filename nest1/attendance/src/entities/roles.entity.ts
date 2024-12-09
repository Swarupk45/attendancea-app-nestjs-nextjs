import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

export enum UserRole1 {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager',
    HR_ADMIN = 'hr admin',
  }
@Entity()
 export class Roles{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({ type: 'varchar', length: 50 })
  roleName: string;

  

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}