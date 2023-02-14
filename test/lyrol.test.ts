import Role from '../src/Role';

describe('Create role and check permissions', () => {
  const role = new Role([
    {
      resource: 'user',
      scopes: 'cr---',
    },
    {
      resource: 'post',
      scopes: 'crudl',
    },
    {
      resource: 'comment',
      scopes: 'crudl',
    },
  ]);

  it('should create a role and check permissions', () => {
    expect(role.canCreate('user')).toBe(true);
    expect(role.canRead('user')).toBe(true);
    expect(role.canUpdate('user')).toBe(false);
    expect(role.canDelete('user')).toBe(false);
    expect(role.canList('user')).toBe(false);

    expect(role.canCreate('post')).toBe(true);
    expect(role.canRead('post')).toBe(true);
    expect(role.canUpdate('post')).toBe(true);
    expect(role.canDelete('post')).toBe(true);
    expect(role.canList('post')).toBe(true);

    expect(role.canCreate('comment')).toBe(true);
    expect(role.canRead('comment')).toBe(true);
    expect(role.canUpdate('comment')).toBe(true);
    expect(role.canDelete('comment')).toBe(true);
    expect(role.canList('comment')).toBe(true);
  });
});

describe('Extend role and check permissions', () => {
  const user = new Role([
    {
      resource: 'user',
      scopes: 'cr---',
    },
  ]);
  const admin = new Role().extend(user).addPermission({
    resource: 'post',
    scopes: 'crudl',
  });

  it('should extend a role and check permissions', () => {
    expect(admin.canCreate('user')).toBe(true);
    expect(admin.canRead('user')).toBe(true);
    expect(admin.canUpdate('user')).toBe(false);
    expect(admin.canDelete('user')).toBe(false);
    expect(admin.canList('user')).toBe(false);

    expect(admin.canCreate('post')).toBe(true);
    expect(admin.canRead('post')).toBe(true);
    expect(admin.canUpdate('post')).toBe(true);
    expect(admin.canDelete('post')).toBe(true);
    expect(admin.canList('post')).toBe(true);
  });
});

describe("Extend role and don't overwrite permissions", () => {
  const user = new Role([
    {
      resource: 'user',
      scopes: 'cr---',
    },
  ]);
  const admin = new Role().extend(user, {
    permissions: [
      { resource: 'post', scopes: 'crudl' },
      { resource: 'user', scopes: '----l' },
    ],
  });

  it("should extend a role and don't overwrite permissions", () => {
    expect(admin.canList('user')).toBe(false);
  });
});

describe('Extend role and overwrite permissions', () => {
  const user = new Role([
    {
      resource: 'user',
      scopes: 'cr---',
    },
  ]);

  const admin = new Role().extend(user, {
    overwrite: true,
    permissions: [
      { resource: 'post', scopes: 'crudl' },
      { resource: 'user', scopes: 'crudl' },
    ],
  });

  it('should extend a role and overwrite permissions', () => {
    expect(admin.canDelete('user')).toBe(true);
  });
});

describe('Check any permission', () => {
  const role = new Role([
    {
      resource: 'user',
      scopes: 'cr---',
    },
    {
      resource: 'post',
      scopes: 'crudl',
    },
    {
      resource: 'comment',
      scopes: 'crudl',
    },
  ]);

  it('should check any permission', () => {
    expect(role.canAny('create', 'user')).toBe(true);
    expect(role.canAny('read', 'user')).toBe(true);
    expect(role.canAny('update', 'user')).toBe(false);
  });
});

describe('Check all permissions', () => {
  const role = new Role([
    {
      resource: 'user',
      scopes: 'cr---',
    },
    {
      resource: 'post',
      scopes: 'crudl',
    },
    {
      resource: 'comment',
      scopes: 'crudl',
    },
  ]);

  it('should check all permissions', () => {
    expect(role.canAll('create', 'user')).toBe(true);
    expect(role.canAll('read', 'user')).toBe(true);
    expect(role.canAll('update', 'user')).toBe(false);
  });
});

describe('Check update permission', () => {
  const role = new Role([
    {
      resource: 'user',
      scopes: 'cr---',
    },
    {
      resource: 'post',
      scopes: 'crudl',
    },
    {
      resource: 'comment',
      scopes: 'crudl',
    },
  ]);

  it('should check update permission', () => {
    expect(role.canUpdate('user')).toBe(false);

    role.updatePermission({
      resource: 'user',
      scopes: 'cru--',
    });
    expect(role.canUpdate('user')).toBe(true);
  });
});

describe('Check delete permission', () => {
  const role = new Role([
    {
      resource: 'user',
      scopes: 'cr---',
    },
    {
      resource: 'post',
      scopes: 'crudl',
    },
    {
      resource: 'comment',
      scopes: 'crudl',
    },
  ]);

  it('should check delete permission', () => {
    expect(role.canCreate('user')).toBe(true);

    role.removePermission('user');
    expect(role.canCreate('user')).toBe(false);
  });
});
