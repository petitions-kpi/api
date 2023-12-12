import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import {
  CreatePermissionDto,
  CreatePermissionsDto,
} from '../dto/create-permission.dto';
import { RoleByIdPipe } from '../pipes/role-by-id.pipe';

@Controller({
  version: '1',
  path: 'roles',
})
export class RoleController {
  constructor (private roleService: RoleService) {}

  @Post(':roleId/permission')
  async createPermission (
    @Body() body: CreatePermissionDto,
    @Param('roleId', RoleByIdPipe) roleId: string,
  ) {
    return await this.roleService.createPermission(roleId, body);
  }

  @Post(':roleId/permissions')
  async createPermissions (
    @Body() body: CreatePermissionsDto,
    @Param('roleId', RoleByIdPipe) roleId: string,
  ) {
    return await this.roleService.createPermissions(roleId, body.permissions);
  }

  @Get(':roleId')
  async getRolePermissions (@Param('roleId', RoleByIdPipe) roleId: string) {
    return await this.roleService.getRolePermissions(roleId);
  }
}
