import { NextFunction, Request, Response } from 'express';
import { AuthError, AuthManager } from '../index';
import {
  IExpressAutorizeOptions,
  IExpressRoleManager,
  IExpressRoleManagerOptions,
} from '../interfaces/index';

class ExpressRoleManager extends AuthManager implements IExpressRoleManager {
  onError?: (
    err: AuthError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  onSucess?: (req: Request, res: Response, next: NextFunction) => void;

  constructor(options: IExpressRoleManagerOptions) {
    super(options);
    this.onError = options.onError;
    this.onSucess = options.onSucess;
  }

  _getRoleFromRequest(req: Request, roleKey: string): string {
    const role = req[roleKey as keyof Request];
    if (!role) {
      throw AuthError.throw_error('INVALID_ROLE');
    }
    return role;
  }

  _getPermissionsFromRequest(req: Request, permissionsKey: string): any {
    const permissions = req[permissionsKey as keyof Request];
    if (!permissions) {
      throw AuthError.throw_error('INVALID_PERMISSIONS');
    }
    return permissions;
  }

  authorize(options: IExpressAutorizeOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        let authorized = false;
        if (!options.usePermissionKey) {
          const role = this._getRoleFromRequest(req, options.roleKey || 'role');
          authorized = this.authorizeRole({
            role,
            action: options.action,
            resource: options.resource,
            loose: options.loose,
          });
        } else {
          const permissions = this._getPermissionsFromRequest(
            req,
            options.permissionsKey || 'permissions'
          );
          authorized = this.authorizeRole({
            permissions,
            action: options.action,
            resource: options.resource,
            loose: options.loose,
            constructRole: true,
          });
        }
        if (authorized) {
          if (this.onSucess) {
            this.onSucess(req, res, next);
          } else {
            next();
          }
        } else {
          if (this.onError) {
            this.onError(AuthError.throw_error('UNAUTHORIZED'), req, res, next);
          } else {
            next(AuthError.throw_error('UNAUTHORIZED'));
          }
        }
      } catch (error: any) {
        if (this.onError) {
          this.onError(error, req, res, next);
        } else {
          next(error);
        }
      }
    };
  }
}

export default ExpressRoleManager;
