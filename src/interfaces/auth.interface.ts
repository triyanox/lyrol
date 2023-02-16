import { IRole, permission } from './role.interface';

/**
 * The interface for the `authorize` function
 */
interface IAutorizeOptions {
  /**
   * The role key
   */
  role?: string;
  /**
   * The action or actions to be performed
   */
  action?: permission | permission[];
  /**
   * The resource or resources that are authorized to be accessed
   */
  resource: string | string[];
  /**
   * Construct the role from permissions
   */
  constructRole?: boolean;
  /**
   * The permissions to be used to construct the role an Object with all the permissions of the role
   */
  permissions?: any;
  /**
   * If the permissions should be checked in a loose way
   * @default false
   */
  loose?: boolean;
}

interface IAuthManagerOptions {
  /**
   * The roles that are available to the `ExpressRoleManager` instance
   */
  roles: { [key: string]: IRole };
  /**
   * The resources that are available to the `ExpressRoleManager` instance
   */
  resources: string[];
}

interface IAuthManager {
  /**
   * The roles that are available to the `ExpressRoleManager` instance
   */
  roles: Map<string, IRole>;
  /**
   * The resources that are available to the `ExpressRoleManager` instance
   */
  resources: Set<string>;
  /**
   * The function that is used to authorize a role
   */
  authorizeRole: (options: IAutorizeOptions) => boolean;
}

export type { IAuthManager, IAuthManagerOptions, IAutorizeOptions };
