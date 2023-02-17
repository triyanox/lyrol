import Koa, { Context } from 'koa';
import Router from 'koa-router';
import request from 'supertest';
import { KoaRoleManager, Role } from '../../src/index';

const role = new Role([
  {
    resource: 'resource1',
    scopes: 'crudl',
  },
  {
    resource: 'resource2',
    scopes: 'cr-dl',
  },
]);

const roleManager = new KoaRoleManager({
  roles: {
    role1: role,
  },
  resources: ['resource1', 'resource2'],
  onError(err, ctx, next): Promise<void> {
    ctx.status = 403;
    ctx.body = 'Forbidden';
    return next();
  },
});

const app = new Koa();

const router = new Router();

interface IAuthCtx extends Context {
  role: string;
}

router.get(
  '/resource1',
  (ctx, next) => {
    (ctx as unknown as IAuthCtx).role = 'role1';
    next();
  },
  roleManager.authorize({
    resource: 'resource1',
    action: ['create', 'update'],
  }),
  (ctx) => {
    ctx.body = 'Hello World!';
  }
);

router.get(
  '/resource2',
  (ctx, next) => {
    (ctx as unknown as IAuthCtx).role = 'role1';
    next();
  },
  roleManager.authorize({
    resource: 'resource2',
    action: ['create', 'update'],
  }),
  (ctx) => {
    ctx.body = 'Hello World!';
  }
);

router.get(
  '/from-permissions',
  (ctx, next) => {
    (ctx as unknown as IAuthCtx).role = 'role1';
    (ctx as unknown as IAuthCtx).permissions = role.toObject();
    next();
  },
  roleManager.authorize({
    resource: 'resource1',
    action: ['create', 'list'],
    usePermissionKey: true,
  }),
  (ctx) => {
    ctx.body = 'Hello World!';
  }
);

app.use(router.routes());
const server = request(app.listen());

export default server;
