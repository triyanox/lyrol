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
  IKoaAutorizeOptions,
  IKoaRoleManager,
  IKoaRoleManagerOptions,
} from './koa.auth.interface';
import {
  INextAutorizeOptions,
  INextRoleManager,
  INextRoleManagerOptions,
} from './next.auth.interface';
import {
  extendOpts,
  IPermission,
  IRole,
  permission,
  permissions,
  scopes,
} from './role.interface';
import {
  PermissionContextType,
  usePermType,
  PermissionProviderProps,
} from './react.interface';

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
  usePermType,
  PermissionProviderProps,
};
