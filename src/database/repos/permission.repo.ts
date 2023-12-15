import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PermissionRepo {
  constructor (private prisma: PrismaService) {}

  async create (data: Prisma.PermissionUncheckedCreateInput) {
    return this.prisma.permission.create({
      data,
    });
  }

  async createMany (data: Prisma.PermissionCreateManyInput[]) {
    return this.prisma.permission.createMany({
      data,
    });
  }

  async findById (id: string) {
    return this.prisma.permission.findFirst({
      where: { id },
    });
  }

  async deleteById (id: string) {
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
