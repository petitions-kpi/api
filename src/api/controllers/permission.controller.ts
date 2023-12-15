import { Controller, Delete, Param } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { PermissionByIdPipe } from '../pipes/pemission-by-id.pipe';

@Controller({
  version: '1',
  path: 'permissions',
})
export class PermissionController {
  constructor (private permissionService: PermissionService) {}

  @Delete(':permissionId')
  async deletePermission (@Param('permissionId', PermissionByIdPipe) permissionId: string) {
    return await this.permissionService.deletePermission(permissionId);
  }
}
