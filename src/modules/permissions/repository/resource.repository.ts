import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResourceRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async findAll() {
    return this._prismaService.resource.findMany({
      include: {
        permission: {
          include: {
            action: true,
          },
          orderBy: {
            createdAt: Prisma.SortOrder.desc,
          },
        },
      },
    });
  }
}
