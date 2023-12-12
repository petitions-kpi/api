import { Injectable } from '@nestjs/common';
import { PermissionRepo } from 'src/database/repos/permission.repo';

@Injectable()
export class PermissionService {
  constructor (private permissionRepo: PermissionRepo) {}

  async deletePermission (permissionId: string) {
    return this.permissionRepo.deleteById(permissionId);
  }
}
