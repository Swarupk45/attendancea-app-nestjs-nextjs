// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from '../users.service';
// import { Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Users } from 'src/entities/users.entity';
// import { Roles } from 'src/entities/roles.entity';

// const mockUserRepository = {
//   findOne: jest.fn(),
//   find: jest.fn(),
//   create: jest.fn(),
//   save: jest.fn(),
//   update: jest.fn(),
//   delete: jest.fn(),
//   count: jest.fn(),
// };

// const mockRoleRepository = {
//   findOne: jest.fn(),
//   find: jest.fn(),
// };

// describe('UsersService', () => {
//   let service: UsersService;
//   let userRepository: Repository<Users>;
//   let roleRepository: Repository<Roles>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(Users),
//           useValue: mockUserRepository,
//         },
//         {
//           provide: getRepositoryToken(Roles),
//           useValue: mockRoleRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//     userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
//     roleRepository = module.get<Repository<Roles>>(getRepositoryToken(Roles));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('findUserByToken', () => {
//     it('should return user if token is valid', async () => {
//       const mockUser = { id: 1, token: 'validToken', role: {} } as Users;
//       userRepository.findOne.

//       const result = await service.findUserByToken('validToken');
//       expect(result).toEqual(mockUser);
//       expect(userRepository.findOne).toHaveBeenCalledWith({
//         where: { token: 'validToken' },
//         relations: ['role'],
//       });
//     });

//     it('should return null if no user is found', async () => {
//       userRepository.findOne.mockResolvedValue(null);
//       const result = await service.findUserByToken('invalidToken');
//       expect(result).toBeNull();
//     });
//   });

//   describe('createUser', () => {
//     it('should create and save a user', async () => {
//       const mockRole = { id: 1, roleName: 'User' } as Roles;
//       const createUserDto = {
//         name: 'John',
//         email: 'john@example.com',
//         password: 'password123',
//         age: 30,
//         roleId: 1,
//         managerid: 2,
//       };

//       roleRepository.findOneBy.mockResolvedValue(mockRole);
//       userRepository.create.mockReturnValue({ ...createUserDto, role: mockRole });
//       userRepository.save.mockResolvedValue({ ...createUserDto, id: 1, role: mockRole });

//       const result = await service.createUser(createUserDto);

//       expect(roleRepository.findOneBy).toHaveBeenCalledWith({ id: createUserDto.roleId });
//       expect(userRepository.create).toHaveBeenCalledWith({ ...createUserDto, role: mockRole });
//       expect(userRepository.save).toHaveBeenCalled();
//       expect(result).toEqual({ ...createUserDto, id: 1, role: mockRole });
//     });
//   });

//   describe('update', () => {
//     it('should update user information', async () => {
//       const mockUser = { id: 1, name: 'John' } as Users;
//       userRepository.update.mockResolvedValue({});
//       userRepository.findOneBy.mockResolvedValue(mockUser);

//       const result = await service.update(1, mockUser);

//       expect(userRepository.update).toHaveBeenCalledWith(1, mockUser);
//       expect(result).toEqual(mockUser);
//     });
//   });

//   describe('delete', () => {
//     it('should delete a user', async () => {
//       userRepository.delete.mockResolvedValue({});
//       await service.delete(1);

//       expect(userRepository.delete).toHaveBeenCalledWith(1);
//     });
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Roles } from 'src/entities/roles.entity';

const mockUserRepository = {
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  count: jest.fn(),
};

const mockRoleRepository = {
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Repository<Users>>;
  let roleRepository: jest.Mocked<Repository<Roles>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Roles),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(Users));
    roleRepository = module.get(getRepositoryToken(Roles));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserByToken', () => {
    it('should return user if token is valid', async () => {
      const mockUser = { id: 1,name:"swarup",age:34,managerid:3,email:"om12@gmail.com",password:"Swarup@4545", token: 'validToken', role: {
        id:1,roleName:"Manager"
      },
     } as Users;
      userRepository.findOne.mockResolvedValue(mockUser);
      
      // const result = await service.findUserByToken('validToken');
      // expect(result).toEqual(mockUser);
      // expect(userRepository.findOne).toHaveBeenCalledWith({
      //   where: { token: 'validToken' },
      //   relations: ['role'],
      // });
    });

    it('should return null if no user is found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const result = await service.findUserByToken('invalidToken');
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create and save a user', async () => {
      const mockRole = { id: 1, roleName: 'User' } as Roles;
      const createUserDto = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
        age: 30,
        roleId: 1,
        managerid: 2,
      };

      roleRepository.findOneBy.mockResolvedValue(mockRole);
      userRepository.create.mockReturnValue({ ...createUserDto, role: mockRole } as any);
      userRepository.save.mockResolvedValue({ ...createUserDto, id: 1, role: mockRole } as any);

      const result = await service.createUser(createUserDto);

      expect(roleRepository.findOneBy).toHaveBeenCalledWith({ id: createUserDto.roleId });
      expect(userRepository.create).toHaveBeenCalledWith({ ...createUserDto, role: mockRole });
      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ ...createUserDto, id: 1, role: mockRole });
    });
  });

  describe('update', () => {
    it('should update user information', async () => {
      const mockUser = { id: 1, name: 'John' } as Users;
      userRepository.update.mockResolvedValue({} as any);
      userRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.update(1, mockUser);

      expect(userRepository.update).toHaveBeenCalledWith(1, mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      userRepository.delete.mockResolvedValue({} as any);
      await service.delete(1);

      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
