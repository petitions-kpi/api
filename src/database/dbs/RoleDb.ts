import { Permission, RoleName } from '@prisma/client';

export class RoleDb {
  id: string;
  name: RoleName;
  permissions: Permission[];
};
