import { Global, Module } from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepo,
  ],
  exports: [
    PrismaService,
    UserRepo,
  ],
})
export class PrismaModule {}