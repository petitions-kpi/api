import { Injectable, PipeTransform } from '@nestjs/common';
import { PermissionRepo } from 'src/database/repos/permission.repo';
import { EntityNotFoundException } from 'src/utils/exceptions/entity-not-found.exception';

@Injectable()
export class PermissionByIdPipe implements PipeTransform {
  constructor (private permissionRepo: PermissionRepo) {}

  async transform (permissionId: string): Promise<string> {
    const permission = await this.permissionRepo.findById(permissionId);

    if (!permission) {
      throw new EntityNotFoundException('Permission');
    }

    return permissionId;
  }
}
