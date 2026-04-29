import { SetMetadata } from "@nestjs/common";
import { Role } from "src/common/enums/roles.enum";

export const ROLES_KEYS = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
