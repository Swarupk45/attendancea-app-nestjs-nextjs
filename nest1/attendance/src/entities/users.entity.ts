import { Entity,Column, PrimaryGeneratedColumn,  ManyToOne } from "typeorm";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Roles } from "./roles.entity";
import { Attendance } from "./attendance.entity";


export const passw={
  password:""
}
@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar",length:100})
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @Column({ type: 'int' })
    @Min(0, { message: 'Age must be a positive number' })
    age: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @Column()
    password:string;



  @ManyToOne(() => Roles, (role) => role.users )
  role: Roles;

  @Column({ nullable: true })
  managerid:number | null;

  @Column({type:'boolean',default:false})
  verify:boolean;

  @Column({ type: 'text', nullable: true }) // New field for storing the token
  token: string | null;

  @ManyToOne(() => Attendance, (attendance) => attendance.users)
  attend: Attendance;


}