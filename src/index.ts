import { AuthError, AuthManager } from './@auth/index';
import { ExpressRoleManager } from './@express/index';
import { KoaRoleManager } from './@koa/index';
import {
  ErrorCodes,
  extendOpts,
  IAuthManager,
  IAuthManagerOptions,
  IAutorizeOptions,
  IExpressAutorizeOptions,
  IExpressRoleManager,
  IExpressRoleManagerOptions,
  IKoaAutorizeOptions,
  IKoaRoleManager,
  IKoaRoleManagerOptions,
  IPermission,
  IRole,
  permission,
  permissions,
  scopes,
} from './interfaces/index';
import Role from './Role/Role';

export { Role, AuthManager, AuthError, ExpressRoleManager, KoaRoleManager };
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
  IKoaAutorizeOptions,
  IKoaRoleManager,
  IKoaRoleManagerOptions,
};
