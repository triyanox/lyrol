import {
  IAuthManager,
  IAuthManagerOptions,
  IAutorizeOptions,
} from './auth.interface';
import { ErrorCodes } from './error.interface';
import {
  IExpressAutorizeOptions,
  IExpressRoleManager,
  IExpressRoleManagerOptions,
} from './express.auth.interface';
import {
  extendOpts,
  IPermission,
  IRole,
  permission,
  permissions,
  scopes,
} from './role.interface';

export type {
  IAuthManager,
  IAuthManagerOptions,
  IAutorizeOptions,
  IPermission,
  IRole,
  permission,
  permissions,
  extendOpts,
  scopes,
  ErrorCodes,
  IExpressRoleManager,
  IExpressRoleManagerOptions,
  IExpressAutorizeOptions,
};
