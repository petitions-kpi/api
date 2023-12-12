import { Injectable, PipeTransform } from '@nestjs/common';
import { RoleRepo } from 'src/database/repos/role.repo';
import { EntityNotFoundException } from 'src/utils/exceptions/entity-not-found.exception';

@Injectable()
export class RoleByIdPipe implements PipeTransform {
  constructor (private roleRepo: RoleRepo) {}
  
  async transform (roleId: string): Promise<string> {
    const role = await this.roleRepo.findById(roleId);

    if (!role) {
      throw new EntityNotFoundException('Role');
    }

    return roleId;
  }
}