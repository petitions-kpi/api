import { Global, Module } from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { PrismaService } from './prisma.service';
import { RoleRepo } from './repos/role.repo';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepo,
    RoleRepo,
  ],
  exports: [
    PrismaService,
    UserRepo,
    RoleRepo,
  ],
})
export class PrismaModule {}