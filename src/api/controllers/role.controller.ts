import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import {
  CreatePermissionDto,
  CreatePermissionsDto,
} from '../dto/create-permission.dto';

@Controller({
  version: '1',
  path: 'roles',
})
export class RoleController {
  constructor (private roleService: RoleService) {}

  @Post(':roleId/permission')
  async createPermission (
    @Body() body: CreatePermissionDto,
    @Param('roleId') roleId: string,
  ) {
    return await this.roleService.createPermission(roleId, body);
  }

  @Post(':roleId/permissions')
  async createPermissions (
    @Body() body: CreatePermissionsDto,
    @Param('roleId') roleId: string,
  ) {
    return await this.roleService.createPermissions(roleId, body.permissions);
  }

  @Get(':roleId')
  async getRolePermissions (@Param('roleId') roleId: string) {
    return await this.roleService.getRolePermissions(roleId);
  }
}
