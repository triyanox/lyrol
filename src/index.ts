import { AuthError, AuthManager } from './auth/index';
import { ExpressRoleManager } from './express/index';
import { KoaRoleManager } from './koa/index';
import { NextRoleManager } from './next/index';
import { PermissionProvider, usePerm } from './react/index';
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
  INextAutorizeOptions,
  INextRoleManager,
  INextRoleManagerOptions,
  IPermission,
  IRole,
  permission,
  permissions,
  scopes,
  PermissionContextType,
  PermissionProviderProps,
  usePermType,
} from './interfaces/index';
import Role from './Role/Role';

export {
  Role,
  AuthManager,
  AuthError,
  ExpressRoleManager,
  KoaRoleManager,
  NextRoleManager,
  PermissionProvider,
  usePerm,
};
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
  IKoaRoleManager,
  IKoaRoleManagerOptions,
  IKoaAutorizeOptions,
  INextRoleManager,
  INextRoleManagerOptions,
  INextAutorizeOptions,
  PermissionContextType,
  PermissionProviderProps,
  usePermType,
};
