import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query, Res, UseInterceptors,Headers, UnauthorizedException  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
// import { identity } from 'rxjs';
import {  Users } from 'src/entities/users.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';
import { UploadedFile} from '@nestjs/common';
import { diskStorage } from 'multer';
import { parse } from 'json2csv';
import * as fs from 'fs';
import { Response } from 'express';

import * as path from 'path';
import * as csv from 'csv-parser';
import { Readable } from 'typeorm/platform/PlatformTools';
import { Repository } from 'typeorm';
import { Roles } from 'src/entities/roles.entity';




@Controller('users')
export class UsersController {
    constructor(
      @InjectRepository(Users)
      private userRepository:Repository<Users>,
      @InjectRepository(Roles)
      private rolesRepositoryL:Repository<Roles>,
      private usersService: UsersService,
    ) { }

    @Post()
    async createUser(@Body() createUserDto: { name: string; age: number; email: string; password: string; roleId: number ;managerid:number }) {
        console.log("alala ")
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    async findAll(
      @Query('search') search?: string,
      @Query('page') page?: string,
      @Query('limit') limit?: string,
    ) {
      return this.usersService.findAll({
        search,
        page: Number(page) || 1,
        limit: Number(limit)  ,
      });
    }
    

    @Get('profileuser')
    async getUserByToken(@Headers('Authorization') authHeader: string) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          console.log("token is missing");
          throw new UnauthorizedException('Token is missing or invalid');
        }

        const token = authHeader.split(' ')[1];
        console.log("in profile")
        const user = await this.usersService.findUserByToken(token);
        console.log("us in pro",user)
        if (!user) {
          console.log("invalid token");
            throw new UnauthorizedException('Invalid token');
        }

        return user;
        
    }

    @Get('managers')
  async getManagers() {
    return await this.usersService.findManagers("Manager");
  }

  @Get("manager/data")
  async getManagerBaseRole(
    @Query('search') search?: string,
      @Query('page') page?: string,
      @Query('limit') limit?: string,
  ){
    return await this.usersService.findManagersBasedData(
      {
        search,
        page: Number(page) || 1,
        limit: Number(limit)  ,
      }
    )
  }
    
    @Get(':id')
    async getUserById(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        console.log("tpyye",id)
      throw new BadRequestException('Invalid ID format');
    }
    return this.usersService.FindAllById(parsedId);
  } 

  

    @Put('password/:id')
    async updatePassword(@Param('id') id: string, @Body() udatedPass: UpdatePasswordDto) {
        const parsedId = parseInt(id, 10);  // Parse id to ensure it is a number
        if (isNaN(parsedId)) {
            throw new BadRequestException('Invalid ID format');
        }
        return this.usersService.updatePassword(parsedId, udatedPass)
    }
    @Put(':id')
    async updateUserInfo(@Param('id') id: number, @Body() updateInfo: Users) {
        return this.usersService.update(id, updateInfo)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return this.usersService.delete(id)
    }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response): Promise<void> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const results = [];
    const errors = [];
    const readableFile = Readable.from(file.buffer); // Convert buffer to readable stream

    // Parse the CSV file
    readableFile.pipe(csv()).on('data', (data) => results.push(data)).on('end', async () => {
      for (const row of results) {
        const { name, age, email, password, roleName } = row;

        try {
          // Validate and process role
          let role = await this.rolesRepositoryL.findOneBy( {roleName});
          if (!role) {
            role = this.rolesRepositoryL.create({roleName });
            await this.rolesRepositoryL.save(role);
          }

          // Check for duplicate email
          const existingUser = await this.userRepository.findOneBy({ email });
          if (existingUser) {
            row.error = 'Duplicate email';
            console.log("Dup")
            errors.push(row);
            continue;
          }

          // Save valid user
          const user = this.userRepository.create({
            name,
            age: parseInt(age, 10),
            email,
            password,
            role,
          });
        
          await this.userRepository.save(user);
        } catch (error) {
          row.error = 'Error processing row';
          errors.push(row);
        }
      }

      // Generate CSV for errors
      if (errors.length > 0) {
        const csvString = parse(errors, { fields: ['name', 'age', 'email', 'roleName', 'error'] });

        // Return CSV for download
        res.header('Content-Type', 'text/csv');
        res.attachment('error-report.csv');
        res.send(csvString);
      } else {
        res.send('All data processed successfully!');
      }
    });
  }

}
