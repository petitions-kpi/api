import { Global, Module } from '@nestjs/common';
import { UserRepo } from './repos/user.repo';
import { PrismaService } from './prisma.service';
import { PetitionRepo } from './repos/petition.repo';
import { RoleRepo } from './repos/role.repo';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepo,
    PetitionRepo,
    RoleRepo,
  ],
  exports: [
    PrismaService,
    UserRepo,
    PetitionRepo,
    RoleRepo,
  ],
})
export class PrismaModule {}