import { Body, Controller, Get, Param, Post,Put,UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(
        @InjectRepository(Users)
        private DBservice:Repository<Users>,
        private authService:AuthService
        ){}

    @Get(':id')
    async findAll(@Param('id') id:number){
        return this.authService.findAll(id);
    }
    @Post('login')
    async login (@Body() body:{email:string; password:string}){
        console.log("EEEE",body.email)
        
        const user=await this.authService.ValidateUser(body.email,body.password);
        if(!user){
            console.log("nottt",user)
            throw new UnauthorizedException("Invalid credentials");
        }
        return this.authService.login(user);
    }

    @Post('forgote/:id')
    async forgetPass(@Param('id') id:number,@Body() body:{password:string}){
        const {password}=body;
        console.log("forgote cnoytrolees")
       return this.authService.ForgotePassword(id,password);
    }
}
