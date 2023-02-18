import { authWrapper, nextServer, roleManager } from './utils/next.server';

describe('NextRoleManager', () => {
  it('should return 403 when role is not authorized', async () => {
    const handler = roleManager.authorize(
      {
        resource: 'resource2',
        action: ['create', 'update'],
      },
      (req, res) => {
        res.status(200).send('Hello World!');
      }
    );

    const res = await nextServer(authWrapper(handler)).get('/resource2');
    expect(res.status).toBe(403);
    expect(res.text).toBe('Forbidden');
  });

  it('should return 200 when role is authorized', async () => {
    const handler = roleManager.authorize(
      {
        resource: 'resource1',
        action: ['create', 'update'],
      },
      (req, res) => {
        res.status(200).send('Hello World!');
      }
    );

    const res = await nextServer(authWrapper(handler))
      .get('/resource1')
      .query({ role: 'role1' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});