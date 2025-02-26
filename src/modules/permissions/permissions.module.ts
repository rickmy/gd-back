import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PermissionRepository } from './repository/permission.repository';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionRepository],
  imports: [PrismaModule],
})
export class PermissionsModule {}
