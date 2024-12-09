import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { Users } from 'src/entities/users.entity';
import { In, QueryFailedError, Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private dbRepository: Repository<Users>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,

  ) { }


  async findUserByToken(token: string): Promise<Users | null> {
    console.log("frofile ser")
    return await this.dbRepository.findOne({
      where: { token },
      relations: ['role'], // Include role details if needed
    });

  }

  async findAll(query: { search?: string; page?: number; limit?: number }) {
    const { search = '', page = 1, limit } = query; // Default values for page and limit

    const qb = this.dbRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role');

    const totalUsers = await this.dbRepository.count(); // Get total number of users in DB

    // If limit is not provided, set it to the total number of users
    const validLimit = limit && !isNaN(limit) && limit > 0 ? limit : totalUsers;
    // Apply search filter if the search term exists
    if (search.trim()) {
      qb.where(
        `LOWER(user.name) LIKE :search OR 
           LOWER(user.email) LIKE :search OR 
           LOWER(role.roleName) LIKE :search OR 
           CAST(user.age AS TEXT) LIKE :search`,
        { search: `%${search.toLowerCase()}%` },
      );
    }
    console.log("Limit", limit);
    // Apply pagination
    qb.skip((page - 1) * limit).take(limit);

    // Execute the query and get results
    const [users, total] = await qb.getManyAndCount();

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      total,
      totalPages,
      page,
      limit
    };
  }

  // async findManagersBasedData(query: { search?: string; page?: number; limit?: number }) {
  //   const { search = '', page = 1, limit } = query; // Default values for page and limit
  
  //   // Fetch the Manager and User roles
  //   const roles = await this.rolesRepository.find({
  //     where: [
  //       { roleName: 'Manager' },
  //       { roleName: 'User' },
  //     ],
  //   });
  
  //   if (roles.length === 0) {
  //     console.log('Manager or User role not found in the database.');
  //     return [];
  //   }
  
  //   console.log('Roles Found:', roles);
  
  //   // Extract role names (since we need to filter by `roleName`)
  //   const roleNames = roles.map((role) => role.roleName);
  
  //   // Build the query to fetch users
  //   const qb = this.dbRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.role', 'role') // Join with the role table
  //     .where('role.roleName IN (:...roleNames)'); // Filter users by roleName
  
  //   // Apply search filter if the search term exists
  //   if (search.trim()) {
  //     qb.andWhere(
  //       `LOWER(user.name) LIKE :search OR 
  //        LOWER(user.email) LIKE :search OR 
  //        LOWER(role.roleName) LIKE :search OR 
  //        CAST(user.age AS TEXT) LIKE :search`,
  //       { search: `%${search.toLowerCase()}%` },
  //     );
  //   }
  
  //   // Get the total number of users matching the query
  //   const total = await qb.getCount();
  
  //   // Apply pagination
  //   const validLimit = limit && !isNaN(limit) && limit > 0 ? limit : total;
  //   qb.skip((page - 1) * validLimit).take(validLimit);
  
  //   // Execute the query and get results
  //   const users = await qb.getMany();
  
  //   // Calculate total pages
  //   const totalPages = Math.ceil(total / validLimit);
  
  //   console.log('Total Users:', total);
  //   console.log('Fetched Users:', users);
  
  //   return {
  //     data: users,
  //     total,
  //     totalPages,
  //     page,
  //     limit
  //   };
  // }
  


  // const managerRole = await this.rolesRepository.findOneBy({ roleName: 'Manager' });

  //   if (!managerRole) {
  //     console.log('Manager role not found in the database.');
  //     return [];
  //   }

  //   console.log('Manager Role:', managerRole);

  //   // Fetch users with the manager role
  //   const managers = await this.dbRepository.find({
  //     where: { role: managerRole }, // Filter users with the manager role
  //     relations: ['role'],          // Include role details
  //   });

  //   console.log('Managers:', managers);

  //   return managers;

  async findManagersBasedData(query: { search?: string; page?: number; limit?: number }) {
    const { search = '', page = 1, limit } = query; // Default values for page and limit

    // Fetch roles for Manager and User
    const roles = await this.rolesRepository.find({
        where: [
            { roleName: 'Manager' },
            { roleName: 'User' },
        ],
    });

    if (roles.length === 0) {
        console.log('Manager or User role not found in the database.');
        return [];
    }

    console.log('Roles Found:', roles);

    // Extract role IDs (assumes your database uses IDs)
    const roleIds = roles.map((role) => role.id);

    // Build the query to fetch users
    const qb = this.dbRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role') // Join with the role table
        .where('role.id IN (:...roleIds)', { roleIds }) // Include only "Manager" and "User" roles

    // Apply search filter if the search term exists
    if (search.trim()) {
        qb.andWhere(
            `(LOWER(user.name) LIKE :search OR 
              LOWER(user.email) LIKE :search OR 
              CAST(user.age AS TEXT) LIKE :search)`,
            { search: `%${search.toLowerCase()}%` },
        );
    }

    // Ensure no Admin users are shown
    qb.andWhere('role.roleName != :adminRole', { adminRole: 'Admin' });

    // Get the total number of users matching the query
    const total = await qb.getCount();

    // Apply pagination
    const validLimit = limit && !isNaN(limit) && limit > 0 ? limit : total;
    qb.skip((page - 1) * validLimit).take(validLimit);

    // Execute the query and get results
    const users = await qb.getMany();

    // Calculate total pages
    const totalPages = Math.ceil(total / validLimit);

    console.log('Total Users:', total);
    console.log('Fetched Users:', users);

    return {
        data: users,
        total,
        totalPages,
        page,
        limit: validLimit,
    };
}

  async findManagers(roleName: string): Promise<Users[]> {

    const role = await this.rolesRepository.findOne({
      where: { roleName: roleName },
      relations: ['users']   // Include all USers    
    })

    if (!role) {
      return [];
    }
    console.log("reols from maanges", role)
    return role.users;

  }

  async createUser(createUserDto: { name: string; age: number; email: string; password: string; roleId: number, managerid: number }) {
    const { name, email, password, age, roleId, managerid } = createUserDto;


    const role = await this.rolesRepository.findOneBy({ id: createUserDto.roleId });
    console.log("roleee", role)
    const r = role.roleName
    const newUser = this.dbRepository.create({
      name,
      email,
      password,
      age,
      role,
      managerid
    });
    console.log("neww", newUser)
    return await this.dbRepository.save(newUser);
  }

  async update(id: number, info: Users) {
    const user = this.dbRepository.update(id, info)
    if (user) {
      console.log("Udate Success")
    }
    return this.dbRepository.findOneBy({ id });
  }

  async delete(id: number) {
    await this.dbRepository.delete(id);
  }

  async FindAllById(id: number) {
    const user = await this.dbRepository.findOne({
      where: { id },
      relations: ['role'],
    })
    return user;
  }

  async updatePassword(id: number, Password: UpdatePasswordDto) {

    console.log('ID Type:', typeof id);  // Should print "number"
    console.log('DTO:', Password);

    const user = await this.dbRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = Password.password; // Ensure password is a string
    return this.dbRepository.save(user);
  }



}
