import { Module } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { RoleController } from '../controllers/role.controller';
import { PermissionService } from '../services/permission.service';
import { PermissionController } from '../controllers/permission.controller';

@Module({
  providers: [RoleService, PermissionService],
  controllers: [RoleController, PermissionController],
})
export class AccessModule {}
