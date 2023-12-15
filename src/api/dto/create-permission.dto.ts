import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreatePermissionDto {
  @IsString({ message: 'Body must be a string' })
  @IsNotEmpty({ message: 'Body is empty' })
    body: string;
}

export class CreatePermissionsDto {
  @IsArray({ message: 'Permissions must be an array' })
  @Type(() => CreatePermissionDto)
  @ValidateNested({ each: true })
    permissions: CreatePermissionDto[];
}
