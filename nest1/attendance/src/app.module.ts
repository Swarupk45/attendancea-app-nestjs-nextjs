// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [AuthModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { User } from './entities/user.entity';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { Users } from './entities/users.entity';
import { RolesModule } from './roles/roles.module';
import { Roles } from './entities/roles.entity';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { TokenVerificationMiddleware } from './middleware/token-verification.middleware';
import { useContainer } from 'class-validator';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'swarup',
      database:'attendance',
      entities:[User,Users,Roles,Attendance],
      synchronize:true,
    }),
    TypeOrmModule.forFeature([Users,Roles,Attendance]),
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AuthController, UsersController,RolesController],
  providers: [UsersService,RolesService],

})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private readonly rolesService: RolesService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenVerificationMiddleware) 
      .exclude('auth/login')// Apply the middleware
      .forRoutes(UsersController,RolesController); // Apply it globally to all routes
  }

  async onApplicationBootstrap() {
    await this.seedRoles();
  }

  private async seedRoles() {
    const predefinedRoles = ['Admin', 'User', 'Manager','Hr'];

    for (const roleName of predefinedRoles) {
      const existingRole = await this.rolesService.findByName(roleName);
      if (!existingRole) {
        await this.rolesService.create({ roleName });
        console.log(`Seeded role: ${roleName}`);
      }
    }
  }
}
