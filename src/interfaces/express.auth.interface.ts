import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../index';
import { IAuthManager } from './auth.interface';
import { IRole, permission } from './role.interface';

/**
 * The interface for the `authorize` function
 */
interface IExpressAutorizeOptions {
  /**
   * The key that is used to get the role from the request object
   * @default 'role'
   */
  roleKey?: string;
  /**
   * The action or actions that are authorized to be executed on the resource
   */
  action?: permission | permission[];
  /**
   * The resource or resources that are authorized to be accessed
   */
  resource: string | string[];
  /**
   * If the permissions are used from the request object
   * @default false
   */
  usePermissionKey?: boolean;
  /**
   * The key that is used to get the permissions from the request object
   * @default 'permissions'
   */
  permissionsKey?: string;
  /**
   * If the permissions should be checked in a loose way
   * @default false
   */
  loose?: boolean;
}

/**
 * The interface for the `ExpressRoleManager` class
 */
interface IExpressRoleManager extends IAuthManager {
  /**
   * The function that is used to authorize a request
   */
  authorize: (
    options: IExpressAutorizeOptions
  ) => (req: Request, res: Response, next: NextFunction) => void;
  onError?: (
    err: AuthError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  onSucess?: (req: Request, res: Response, next: NextFunction) => void;
}

/**
 * The options for the `ExpressRoleManager` class
 */
interface IExpressRoleManagerOptions {
  /**
   * The roles that are available to the `ExpressRoleManager` instance
   * @default {}
   */
  roles: { [key: string]: IRole };
  /**
   * The resources that are available to the `ExpressRoleManager` instance
   * @default []
   */
  resources: string[];
  onError?: (
    err: AuthError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  onSucess?: (req: Request, res: Response, next: NextFunction) => void;
}

export type {
  IExpressRoleManager,
  IExpressRoleManagerOptions,
  IExpressAutorizeOptions,
};
