import { Injectable } from '@nestjs/common';
import { RoleDb } from 'src/database/dbs/RoleDb';
import { PermissionRepo } from 'src/database/repos/permission.repo';
import { RoleRepo } from 'src/database/repos/role.repo';

@Injectable()
export class PermissionService {
  constructor (
    private permissionRepo: PermissionRepo,
    private roleRepo: RoleRepo,
  ) {}

  async deletePermission (permissionId: string) {
    return this.permissionRepo.deleteById(permissionId);
  }

  async matchPermissions (userId: string, permissions: string[]) {
    const userRoles = await this.roleRepo.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });

    return this.matchPermissionsInRoles(userRoles, permissions);
  }

  private matchPermissionsInRoles (roles: RoleDb[], permissions: string[]) {
    const rolesPermissions = roles.flatMap((role) =>
      role.permissions.map((p) => p.body),
    );

    for (const permission of permissions) {
      const hasPermission = rolesPermissions.find((p) => p === permission);
      if (!hasPermission) {
        return false;
      }
    }
    return true;
  }
}
