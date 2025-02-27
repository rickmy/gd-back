import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { RolRepository } from './repository/rol.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RolRepository],
  exports: [RoleService],
  imports: [PrismaModule, PermissionsModule],
})
export class RoleModule {}
