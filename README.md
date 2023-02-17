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

## Create Roles

### Basic Usage

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

### Extend a role

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

### Overwrite a permission in extended role

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

### Save the role to a database

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

### Load the role from a database

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

## Authorize a user

### Express Middleware

You can create a new instance of the `ExpressRoleManager` class and use the `authorize` method to authorize a user.

```ts
import { ExpressRoleManager, Role } from 'lyrol';
import express from 'express';

const app = express();

const user = new Role([
  {
    resource: 'post',
    scopes: 'crudl',
  },
  {
    resource: 'comment',
    scopes: 'crudl',
  },
]);

const roleManager = new ExpressRoleManager({
  roles: {
    user,
  },
  resources: ['post', 'comment'],
});

interface IAuthRequest {
  role: string;
  permissions: any;
}

app.get(
  '/comment',
  (req, res, next) => {
    (req as unknown as IAuthRequest).role = 'role1';
    next();
  },
  roleManager.authorize({
    resource: 'comment',
    action: ['read', 'list'],
  }),
  (req, res) => {
    res.send('Hello World!');
  }
);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```
The `authorize` method takes multiple options as a parameter.

- `resource` - The resource to be accessed. Can be a string or an array of strings.
- `action` - The action to authorize. Can be a string or an array of strings.
- `roleKey` - The key of the role in the request object. Default is `role`.
- `usePermissionKey` - It's a boolean value. If set to `true` the `authorize` with create a role from the permissions in the request object. Default is `false`.
- `permissionKey` - The key of the permissions in the request object. Default is `permissions`.
- `loose` - It's a boolean value. If set to `true` the `authorize` method will authorize the user if the user has any of the actions. Default is `false`.

You can pass a custom error handler and success handler to the instance of the `ExpressRoleManager` class.

```ts
import { ExpressRoleManager, Role } from 'lyrol';

const roleManager = new ExpressRoleManager({
  roles: {
    user,
  },
  resources: ['post', 'comment'],
  onError: (err, req, res, next) => {
    res.status(403).send('Forbidden');
  },
  onSucess: (req, res, next) => {
    res.send('Hello World!');
  },
});
```

### Koa Middleware

You can create a new instance of the `KoaRoleManager` class and use the `authorize` method to authorize a user.

```ts
import { KoaRoleManager, Role } from 'lyrol';
import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();

const user = new Role([
  {
    resource: 'post',
    scopes: 'crudl',
  },
  {
    resource: 'comment',
    scopes: 'crudl',
  },
]);

const roleManager = new KoaRoleManager({
  roles: {
    user,
  },
  resources: ['post', 'comment'],
  onError: (err, ctx, next) => {
    ctx.status = 403;
    ctx.body = 'Forbidden';
  },
  onSucess: (ctx, next) => {
    ctx.body = 'Hello World!';
  },
});

interface IAuthCtx {
  role: string;
  permissions: any;
}

const router = new Router();

router.get(
  '/comment',
  async (ctx, next) => {
    (ctx as unknown as IAuthCtx).role = 'role1';
    await next();
  },
  roleManager.authorize({
    resource: 'comment',
    action: ['read', 'list'],
  }),
  async (ctx) => {
    ctx.body = 'Hello World!';
  }
);

app.use(router.routes());

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```
The `authorize` method takes the same options as the `authorize` method of the `ExpressRoleManager` class.

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details