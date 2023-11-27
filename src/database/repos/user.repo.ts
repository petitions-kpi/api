import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepo {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    mailToken: true,
    roles: {
      include: {
        role: true,
      },
    },
  };
  
  async find (where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({
      where,
      include: this.include,
    });
  }

  findById (id: string) {
    return this.prisma.user.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async create (data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data,
      include: this.include,
    });
  }

  async updateById (id: string, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: this.include,
    });
  }
}