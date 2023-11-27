import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, State } from '@prisma/client';
import { HOUR } from '../utils/constants';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit () {
    await this.$connect();
    await this.user.deleteMany({
      where: {
        state: State.PENDING,
        mailToken: {
          createdAt: {
            lt: new Date(Date.now() - HOUR),
          },
        },
      },
    });
  }
}