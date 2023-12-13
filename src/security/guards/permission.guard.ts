import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { Request } from 'express';
import { PermissionService } from 'src/api/services/permission.service';
import { NoPermissionException } from 'src/utils/exceptions/no-permission.exception';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor (
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  private request: Request;

  async canActivate (context: ExecutionContext): Promise<boolean> {
    this.request = context.switchToHttp().getRequest<Request>();

    const user: User = this.request.user as User;
    const permissions = this.getPermissions(context);

    const isMatch = await this.permissionService.matchPermissions(user.id, permissions);
    
    if (!isMatch) {
      throw new NoPermissionException();
    }

    return true;
  }

  private getPermissions (context: ExecutionContext) {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    return permissions;
  }
}
