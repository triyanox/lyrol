import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  IRole,
  PermissionContextType,
  PermissionProviderProps,
  permission,
  permissions,
  usePermType,
} from '../interfaces';

const PermissionContext = createContext<PermissionContextType>({
  permissions: {},
  setPerm: () => {},
  getPerm: () => false,
  setInitialPerm: () => {},
  generate: () => ({}),
});

/**
 * A React context provider that provides the current set of permissions and functions to set and get permissions.
 */
const PermissionProvider: React.FC<PermissionProviderProps> = ({
  children,
}: PermissionProviderProps) => {
  const [permissions, setPermissions] = useState<
    Record<string, Record<permission, boolean>>
  >({});

  const setPerm = (
    resource: string,
    permission: permissions,
    grant: boolean
  ) => {
    const newPermissions = { ...permissions };
    if (!newPermissions[resource]) {
      newPermissions[resource] = {} as Record<permission, boolean>;
    }
    if (Array.isArray(permission)) {
      permission.forEach((p) => {
        newPermissions[resource][p] = grant;
      });
    } else {
      newPermissions[resource][permission] = grant;
    }
    setPermissions(newPermissions);
  };

  const getPerm = (resource: string, permission?: permissions) => {
    if (!permissions[resource]) {
      return false;
    }
    if (!permission) {
      return permissions[resource] as { [key: string]: boolean };
    }
    if (Array.isArray(permission)) {
      return permission.reduce((acc, p) => {
        return acc && permissions[resource][p];
      }, true);
    }
    return permissions[resource][permission];
  };

  const setInitialPerm = (role: IRole) => {
    setPermissions(
      role.toObject() as Record<string, Record<permission, boolean>>
    );
  };

  const generate = (type: 'json' | 'object') => {
    if (type === 'json') {
      return JSON.stringify(permissions);
    }

    return permissions;
  };

  return (
    <PermissionContext.Provider
      value={{ permissions, generate, setPerm, getPerm, setInitialPerm }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

/**
 * A custom hook that provides access to the permission context values.
 * @param {IRole} role - An optional role object to set initial permissions.
 * @returns {{permissions: Record<string, Record<permission, boolean>>, setPerm: Function, getPerm: Function, load: Function, generate: Function}} An object containing permission related functions and values.
 */
const usePerm = (role?: IRole): usePermType => {
  const { permissions, setPerm, getPerm, setInitialPerm, generate } =
    useContext(PermissionContext);
  useEffect(() => {
    if (role) {
      setInitialPerm(role);
    }
  }, [role, setInitialPerm]);

  return { permissions, setPerm, getPerm, load: setInitialPerm, generate };
};

export { PermissionProvider, usePerm };
