import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleRepo {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    permissions: true,
  };

  async findMany (args: Prisma.RoleFindManyArgs) {
    return this.prisma.role.findMany({
      ...args,
      include: this.include,
    });
  }
}