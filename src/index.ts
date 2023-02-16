import { AuthError, AuthManager } from './@auth/index';
import { ExpressRoleManager } from './@express/index';
import {
  ErrorCodes,
  extendOpts,
  IAuthManager,
  IAuthManagerOptions,
  IAutorizeOptions,
  IExpressAutorizeOptions,
  IExpressRoleManager,
  IExpressRoleManagerOptions,
  IPermission,
  IRole,
  permission,
  permissions,
  scopes,
} from './interfaces/index';
import Role from './Role/Role';

export { Role, AuthManager, AuthError, ExpressRoleManager };
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
