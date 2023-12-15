import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { SetPermissions } from './set-permissions.decorator';

export const Access = (...permissions: string[]) =>
  applyDecorators(
    SetPermissions(permissions),
    UseGuards(JwtAuthGuard, PermissionGuard),
  );
