/**
 * Concat type
 */
type Concat<T extends string, U extends string> = `${T}${U}`;

/**
 * Permission interface
 */
interface IPermission {
  resource: string;
  scopes: Concat<
    'c' | '-',
    Concat<'r' | '-', Concat<'u' | '-', Concat<'d' | '-', 'l' | '-'>>>
  >;
}

/**
 * Permission type
 */
type permission = 'create' | 'read' | 'update' | 'delete' | 'list';

/**
 * Permissions type
 */
type permissions =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'list'
  | ('create' | 'read' | 'update' | 'delete' | 'list')[];

type extendOpts =
  | { overwrite?: boolean; permissions?: IPermission[] }
  | IPermission[];

/**
 * Role interface
 */
interface IRole {
  /**
   * permissions
   */
  permissions: IPermission[];
  /**
   * Add permission
   * @param permission - Permission to add
   */
  addPermission(permission: IPermission): this;
  /**
   * Remove permission
   * @param resource - Resource to remove
   */
  removePermission(resource: string): this;
  /**
   * Update permission
   * @param permission - Permission to update
   */
  updatePermission(permission: IPermission): this;
  /**
   * Check if the user with this role can create a resource
   * @param resource - Resource to check
   */
  canCreate(resource: string): boolean;
  /**
   * Check if user with this role can read a resource
   * @param resource - Resource to check
   */
  canRead(resource: string): boolean;
  /**
   * Check if user with this role can update a resource
   * @param resource - Resource to check
   */
  canUpdate(resource: string): boolean;
  /**
   * Check if user with this role can delete a resource
   * @param resource - Resource to check
   */
  canDelete(resource: string): boolean;
  /**
   * Check if user with this role can list a resource
   * @param resource - Resource to check
   */
  canList(resource: string): boolean;
  /**
   * Check if user can perform a permission on a resource
   */
  can(permission: permission, resource: string): boolean;
  /**
   * Check if user can perform any of the permissions on a resource
   * @param permissions - Permissions to check
   * @param resource - Resource to check
   */
  canAny(permissions: permissions, resource: string): boolean;
  /**
   * Check if user can perform all of the permissions on a resource
   * @param permissions - Permissions to check
   * @param resource - Resource to check
   */
  canAll(permissions: permissions, resource: string): boolean;
  /**
   * Generates a a javascript object or json string of the role with all the permissions
   * @param format - Format to return the role in ( json or object )
   */
  generate(format: 'json' | 'object'): Object | string;
  /**
   * Extends the role with another role
   */
  extend(role: IRole, options?: extendOpts): this;
  /**
   * toJSON method to generate a json string of the role
   */
  toJSON(): string;
  /**
   * `toObject` method to generate a javascript object of the role
   */
  toObject(): Object;
}

export type { IPermission, IRole, permission, permissions, extendOpts };
