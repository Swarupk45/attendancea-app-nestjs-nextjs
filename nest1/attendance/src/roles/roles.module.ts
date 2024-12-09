import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  // Import TypeOrmModule for the Roles entity
import { Roles } from 'src/entities/roles.entity'; // Make sure the path is correct

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],  // Add the Roles entity here
  providers: [RolesService],  // Add RolesService to providers
  controllers: [RolesController],
  exports: [RolesService],  // Add RolesController to controllers
})
export class RolesModule {}
