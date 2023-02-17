import { Context, Next } from 'koa';
import { AuthError, AuthManager } from '../index';
import {
  IKoaAutorizeOptions,
  IKoaRoleManager,
  IKoaRoleManagerOptions,
} from '../interfaces/index';

class KoaRoleManager extends AuthManager implements IKoaRoleManager {
  onError?: (err: AuthError, ctx: Context, next: Next) => Promise<void> | void;
  onSucess?: (ctx: Context, next: Next) => Promise<void> | void;

  constructor(options: IKoaRoleManagerOptions) {
    super(options);
    this.onError = options.onError;
    this.onSucess = options.onSucess;
  }

  _getRoleFromRequest(ctx: Context, roleKey: string): string {
    const role = ctx[roleKey as keyof Context];
    if (!role) {
      throw AuthError.throw_error('INVALID_ROLE');
    }
    return role;
  }

  _getPermissionsFromRequest(ctx: Context, permissionsKey: string): any {
    const permissions = ctx[permissionsKey as keyof Context];
    if (!permissions) {
      throw AuthError.throw_error('INVALID_PERMISSIONS');
    }
    return permissions;
  }

  authorize(options: IKoaAutorizeOptions) {
    return async (ctx: Context, next: Next) => {
      try {
        let authorized = false;
        if (!options.usePermissionKey) {
          const role = this._getRoleFromRequest(ctx, options.roleKey || 'role');
          authorized = this.authorizeRole({
            role,
            action: options.action,
            resource: options.resource,
            loose: options.loose,
          });
        } else {
          const permissions = this._getPermissionsFromRequest(
            ctx,
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
        if (!authorized) {
          throw AuthError.throw_error('UNAUTHORIZED');
        }
        if (this.onSucess) {
          this.onSucess(ctx, next);
        } else {
          await next();
        }
      } catch (err: any) {
        if (this.onError) {
          this.onError(err, ctx, next);
        } else {
          throw err;
        }
      }
    };
  }
}

export default KoaRoleManager;
