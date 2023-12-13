import { Global, Module } from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { PrismaService } from './prisma.service';
import { PetitionRepo } from './repos/petition.repo';
import { RoleRepo } from './repos/role.repo';
import { PermissionRepo } from './repos/permission.repo';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepo,
    PetitionRepo,
    RoleRepo,
    PermissionRepo,
  ],
  exports: [
    PrismaService,
    UserRepo,
    PetitionRepo,
    RoleRepo,
    PermissionRepo,
  ],
})
export class PrismaModule {}