import { Injectable } from '@nestjs/common';
import { PermissionRepo } from 'src/database/repos/permission.repo';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { Permission } from '@prisma/client';
import { RoleRepo } from 'src/database/repos/role.repo';

@Injectable()
export class RoleService {
  constructor (
    private permissionRepo: PermissionRepo,
    private roleRepo: RoleRepo,
  ) {}

  async createPermission (
    roleId: string,
    body: CreatePermissionDto,
  ): Promise<Permission> {
    const permission = { ...body, roleId };

    return this.permissionRepo.create(permission);
  }

  async createPermissions (roleId: string, permissions: CreatePermissionDto[]) {
    const data = permissions.map((perm) => ({ ...perm, roleId }));

    return this.permissionRepo.createMany(data);
  }

  async getRolePermissions (roleId: string) {
    return this.roleRepo.findById(roleId);
  }
}
