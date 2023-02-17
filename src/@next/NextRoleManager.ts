import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { AuthError, AuthManager } from '../index';
import {
  INextAutorizeOptions,
  INextRoleManager,
  INextRoleManagerOptions,
} from '../interfaces';

/**
 * The class that is used to manage roles and permissions
 * @extends AuthManager
 */
class NextRoleManager extends AuthManager implements INextRoleManager {
  onError?: (
    err: AuthError,
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void> | void;
  onSucess?: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void> | void;

  constructor(options: INextRoleManagerOptions) {
    super(options);
    this.onError = options.onError;
    this.onSucess = options.onSucess;
  }

  _getRoleFromRequest(req: NextApiRequest, roleKey: string): string {
    const role = req[roleKey as keyof NextApiRequest];
    if (!role) {
      throw AuthError.throw_error('INVALID_ROLE');
    }
    return role;
  }

  _getPermissionsFromRequest(req: NextApiRequest, permissionsKey: string): any {
    const permissions = req[permissionsKey as keyof NextApiRequest];
    if (!permissions) {
      throw AuthError.throw_error('INVALID_PERMISSIONS');
    }
    return permissions;
  }

  authorize(options: INextAutorizeOptions, handler: NextApiHandler) {
    return (req: NextApiRequest, res: NextApiResponse) => {
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
          });
        }
        if (authorized) {
          if (this.onSucess) {
            this.onSucess(req, res);
          } else {
            handler(req, res);
          }
        } else {
          throw AuthError.throw_error('UNAUTHORIZED');
        }
      } catch (err: any) {
        if (this.onError) {
          this.onError(err, req, res);
        } else {
          throw err;
        }
      }
    };
  }
}

export default NextRoleManager;
