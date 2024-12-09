import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users)
        private UserReposetory: Repository<Users>,
        private jwtService: JwtService
    ) { }

    async findAll(Id: number) {
        const user = await this.UserReposetory.findOneBy({ id: Id });
        return user;
    }
    async ValidateUser(email: string, password: string) {
        const user = await this.UserReposetory.findOneBy({ email });
        console.log(user,"shodh")
        if (user && user.password === password) {
            console.log("alala", user)
            return email;
        }

        throw new UnauthorizedException("Invalid Email or Password")
    }
    // async login(email: string) {
    //     const payload = { email: email };
    //     const user = await this.UserReposetory.findOne({
    //         where: { email },
    //         relations: ['role'], // Include the 'role' relation
    //     })
        

    //     return {
    //         data: user,
    //         access_token: this.jwtService.sign(payload),
    //     }
    // }
    async login(email: string) {
        const payload = { email: email };
        const token = this.jwtService.sign(payload);
        
        const user = await this.UserReposetory.findOne({
            where: { email },
            relations: ['role'],
        });

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        // Save the token in the database
        user.token = token;
        const us=await this.UserReposetory.save(user);
        console.log("user",us);
        return {
            data: user,
            access_token: token,
        };
    }

    async ForgotePassword(id: number, password: string) {

        const user = await this.UserReposetory.findOne({
            where: { id },
            relations: ['role'], // Include the 'role' relation
        })
        user.password = password;
        console.log("forgote service")
        user.verify = true;
        return this.UserReposetory.save(user);

    }
}  
