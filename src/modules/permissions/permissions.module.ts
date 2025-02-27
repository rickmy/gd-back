import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionRepository } from './repository/permission.repository';
import { ResourceRepository } from './repository/resource.repository';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionRepository, ResourceRepository],
  imports: [PrismaModule],
})
export class PermissionsModule {}
