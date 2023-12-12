import { Global, Module } from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { PrismaService } from './prisma.service';
import { RoleRepo } from './repos/role.repo';
import { PermissionRepo } from './repos/permission.repo';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepo,
    RoleRepo,
    PermissionRepo,
  ],
  exports: [
    PrismaService,
    UserRepo,
    RoleRepo,
    PermissionRepo,
  ],
})
export class PrismaModule {}