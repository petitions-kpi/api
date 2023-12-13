import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { PetitionDb } from '../dbs/PetitionDb';

@Injectable()
export class PetitionRepo {
  constructor (
    private prisma: PrismaService,
  ) {}

  private include = {
    author: {
      include: {
        user: true,
      },
    },
    signatures: {
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
    },
  };

  async findMany (args: Prisma.PetitionFindManyArgs): Promise<PetitionDb[]> {
    return this.prisma.petition.findMany({
      ...args,
      include: this.include,
    }) as Promise<PetitionDb[]>;
  }

  async findById (id: number): Promise<PetitionDb> {
    return this.prisma.petition.findFirst({
      where: { id },
      include: this.include,
    });
  }

  async create (data: Prisma.PetitionUncheckedCreateInput): Promise<PetitionDb> {
    return this.prisma.petition.create({
      data,
      include: this.include,
    });
  }

  async find (where: Prisma.PetitionWhereInput): Promise<PetitionDb> {
    return this.prisma.petition.findFirst({
      where,
      include: this.include,
    });
  }

  async updateById (id: number, data: Prisma.PetitionUncheckedUpdateInput): Promise<PetitionDb> {
    return this.prisma.petition.update({
      where: { id },
      data,
      include: this.include,
    });
  }
}