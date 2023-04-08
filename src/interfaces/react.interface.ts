import { IRole, permission, permissions } from './role.interface';

interface PermissionProviderProps {
  children: React.ReactNode;
}

/**
 * Interface representing the type of the context object returned by the `PermissionContext` provider.
 */
interface PermissionContextType {
  /** The current set of permissions. */
  permissions: Record<string, Record<permission, boolean>>;

  /**
   * Sets the permissions for a given resource and permission(s).
   * @param resource The resource for which to set permissions.
   * @param permission The permission(s) to set.
   * @param grant Whether to grant or deny the permission(s).
   */
  setPerm: (resource: string, permission: permissions, grant: boolean) => void;

  /**
   * Gets the permissions for a given resource and permission(s).
   * @param resource The resource for which to get permissions.
   * @param permission Optional. The permission(s) to get. If omitted, all permissions for the resource are returned.
   * @returns The value of the requested permission(s), or an object containing all permissions for the resource.
   */
  getPerm: (
    resource: string,
    permission?: permissions
  ) => boolean | Record<string, boolean>;

  /**
   * Sets the initial set of permissions based on the provided `IRole` object.
   * @param role The role object from which to derive the initial permissions.
   */
  setInitialPerm: (role: IRole) => void;

  /**
   * Generates a JSON or object representation of the current set of permissions.
   * @param type The type of representation to generate.
   * @returns The JSON or object representation of the current set of permissions.
   */
  generate: (
    type: 'json' | 'object'
  ) => Record<string, Record<permission, boolean>> | string;
}

/**
 * The type of the `usePerm` hook.
 */
type usePermType = {
  /**
   * The current set of permissions.
   */
  permissions: Record<string, Record<permission, boolean>>;
  /**
   * Sets the permissions for a given resource and permission(s).
   * @param resource The resource for which to set permissions.
   * @param permission The permission(s) to set.
   * @param grant Whether to grant or deny the permission(s).
   */
  setPerm: (resource: string, permission: permissions, grant: boolean) => void;

  /**
   * Gets the permissions for a given resource and permission(s).
   * @param resource The resource for which to get permissions.
   * @param permission Optional. The permission(s) to get. If omitted, all permissions for the resource are returned.
   * @returns The value of the requested permission(s), or an object containing all permissions for the resource.
   */
  getPerm: (
    resource: string,
    permission?: permissions
  ) => boolean | Record<string, boolean>;

  /**
   * Sets the initial set of permissions based on the provided `IRole` object.
   * @param role The role object from which to derive the initial permissions.
   */
  load: (role: IRole) => void;

  /**
   * Generates a JSON or object representation of the current set of permissions.
   * @param type The type of representation to generate.
   * @returns The JSON or object representation of the current set of permissions.
   */
  generate: (
    type: 'json' | 'object'
  ) => Record<string, Record<permission, boolean>> | string;
};

export type { PermissionContextType, usePermType, PermissionProviderProps };
