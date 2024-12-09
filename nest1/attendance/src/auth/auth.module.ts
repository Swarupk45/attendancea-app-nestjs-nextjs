// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/entities/user.entity';

// @Module({
//   imports:[
//     PassportModule,
//     JwtModule.register({
//       secret:'ATTENDANCE',
//       signOptions:{expiresIn:'1h'}
//     }),
//     TypeOrmModule.forFeature([User])
//   ],
//   providers: [AuthService],
//   controllers: [AuthController]
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'ATTENDANCE',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Users]), // Import User entity
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService if needed in other modules
})
export class AuthModule {}
