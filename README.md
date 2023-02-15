# lyrol - A role management library for node.js

Lyrol is a simple permission based role management library for node.js. It is designed to be as simple as possible, while still being powerful enough to be useful.

## Installation

You can install lyrol using npm:

```bash
npm install lyrol
```
or yarn:

```bash
yarn add lyrol
```

## Basic Usage

```ts
import { Role } from 'lyrol';

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

console.log(role.canCreate('user')); // true
console.log(role.canRead('user')); // true
console.log(role.canUpdate('user')); // false
console.log(role.can('create', 'user')); // true
```

## Extend a role

You can extend a role by using the `extend` method. This will create a new role with the same permissions as the original role, plus any additional permissions you specify.

```ts
import { Role } from 'lyrol';

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

const admin = new Role().extend(role).addPermissions([
  {
    resource: 'group',
    scopes: 'crudl',
  },
]);
```

or you can pass an array as a second argument to the `extend` method instead of using the `addPermissions` method.

```ts
import { Role } from 'lyrol';

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

const admin = new Role().extend(role, [
  {
    resource: 'group',
    scopes: 'crudl',
  },
]);
```

## Overwrite a permission in extended role

The `extend` method takes optional options as a second parameter. You can use the `overwrite` option to overwrite a permission in the extended role add pass the new permissions as the `permissions` .

```ts
import { Role } from 'lyrol';

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

const admin = new Role().extend(role, {
  overwrite: true,
  permissions: [
    {
      resource: 'user',
      scopes: 'crudl',
    },
  ],
});

console.log(admin.canDelete('user')); // true
```

## Save the role to a database

You can save the role to a database by using the `toJSON` method. This will return JSON stringified permissions.

```ts
import { Role } from 'lyrol';

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

const permissions = role.toJSON();
```

or use the `toObject` for a javascript object.

```ts
import { Role } from 'lyrol';

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

const permissions = role.toObject();
```

or use use the `generate` method and pass the output type as the first argument.

```ts
import { Role } from 'lyrol';

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

const permissions = role.generate('json');
```

## Load the role from a database

You can load the role from your database by using the `fromJSON` or `fromObject` method.

```ts
import { Role } from 'lyrol';

const role = Role.fromJSON(
  '{"user":{"create":false,"read":false,"update":false,"delete":false,"list":true},"post":{"create":true,"read":true,"update":true,"delete":true,"list":true},"comment":{"create":true,"read":true,"update":true,"delete":true,"list":true},"page":{"create":true,"read":true,"update":true,"delete":true,"list":true},"picture":{"create":false,"read":false,"update":true,"delete":true,"list":true}}'
);

role.canCreate('user'); // false
```

or

```ts
import { Role } from 'lyrol';

const role = Role.fromObject({
    user: {
      create: false,
      read: false,
      update: false,
      delete: false,
      list: true,
    },
    post: { create: true, read: true, update: true, delete: true, list: true },
    comment: {
      create: true,
      read: true,
      update: true,
      delete: true,
      list: true,
    },
    page: { create: true, read: true, update: true, delete: true, list: true },
    picture: {
      create: false,
      read: false,
      update: true,
      delete: true,
      list: true,
    },
});

role.canCreate('user'); // false
```
## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details