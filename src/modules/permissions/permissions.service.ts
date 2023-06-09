import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(
    private _prismaService: PrismaService
  ) {}

  async create(permission: CreatePermissionDto): Promise<PermissionEntity> {
    return await this._prismaService.permission.create({
      data: permission
    });
  }

  async findAll(): Promise<PermissionEntity[]> {
    return await this._prismaService.permission.findMany();
  }

  async findOne(id: number): Promise<PermissionEntity> {
    return await this._prismaService.permission.findUnique({
      where: {
        id: parseInt(id.toString()),
      }
    });
  }


  async update(id: number, permission: PermissionEntity): Promise<PermissionEntity> {
    return await this._prismaService.permission.update({
      where: {
        id: parseInt(id.toString()),
      },
      data: permission
    });
  }

  async remove(id: number): Promise<void> {
    await this._prismaService.permission.delete({
      where: {
        id: parseInt(id.toString()),
        
      },
    });
  }
}
