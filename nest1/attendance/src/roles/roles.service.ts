// // import { Injectable } from '@nestjs/common';
// // import { Roles } from 'src/entities/roles.entity';
// // import { Repository } from 'typeorm';
// // import { InjectRepository } from '@nestjs/typeorm';  // Make sure this import is included

// // @Injectable()
// // export class RolesService {
// //   constructor(
// //     @InjectRepository(Roles)  // Use InjectRepository to inject the repository
// //     private dbRoles: Repository<Roles>,
// //   ) {}

// //   async getRoles() {    
    
// //     return this.dbRoles.find();
// //   }

// //   async create(Role: string): Promise<Roles> {
// //     const newRole = this.dbRoles.create();
// //     return this.dbRoles.save(newRole);
// //   }

// // }


// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Roles } from '../entities/roles.entity';

// @Injectable()
// export class RolesService {
//   constructor(
//     @InjectRepository(Roles)
//     private readonly rolesRepository: Repository<Roles>,
//   ) {}

//   async create(createRoleDto: { roleName: string }) {
//     const newRole = this.rolesRepository.create(createRoleDto);
//     return await this.rolesRepository.save(newRole);
//   }

//   async findAll() {
//     return await this.rolesRepository.find();
//   }
  
//   async findByName(roleName: string) {
//     return await this.rolesRepository.findOneBy({ roleName });
//   }
// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async create(createRoleDto: { roleName: string }) {
    const newRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(newRole);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findByName(roleName: string) {
    return await this.rolesRepository.findOneBy({ roleName });
  }
}
