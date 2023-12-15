import { Module } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { RoleController } from '../controllers/role.controller';
import { PermissionService } from '../services/permission.service';
import { PermissionController } from '../controllers/permission.controller';
import { PermissionGuard } from 'src/security/guards/permission.guard';

@Module({
  providers: [RoleService, PermissionService, PermissionGuard],
  controllers: [RoleController, PermissionController],
  exports: [RoleService, PermissionService, PermissionGuard],
})
export class AccessModule {}
