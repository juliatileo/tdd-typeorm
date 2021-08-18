import {
  DeepPartial,
  getRepository,
  createConnections,
  Connection,
} from 'typeorm';
import { User } from '@app_entities/index';
import {
  PLIN_DB_HOST,
  PLIN_DB_NAME,
  PLIN_DB_USER,
  PLIN_DB_PASS,
  PLIN_DB_PORT,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
} from '@config/env';

let connections: Connection[];

beforeAll(async () => {
  connections = await createConnections([
    {
      name: 'default',
      type: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: ['src/database/app/entity/*.ts'],
      synchronize: true,
    },
    {
      name: 'plin_db',
      type: 'postgres',
      host: PLIN_DB_HOST,
      port: Number(PLIN_DB_PORT),
      username: PLIN_DB_USER,
      password: PLIN_DB_PASS,
      database: PLIN_DB_NAME,
      entities: ['src/database/plin/entity/*.ts'],
    },
  ]);
});

test('it should create', async () => {
  const data: DeepPartial<User> = { name: 'test-user' };

  const user = await getRepository(User).save(data);

  expect(user).toHaveProperty('created_at');
});

test('it should update', async () => {
  let data: DeepPartial<User> = { name: 'test-user' };

  let user = await getRepository(User).save(data);

  data = { id: user.id, name: 'test-update-user' };

  user = await getRepository(User).save(data);

  expect(user.name).toBe('test-update-user');
});

test('it should delete', async () => {
  let data: DeepPartial<User> = { name: 'test-user' };

  let user = await getRepository(User).save(data);

  data = { id: user.id, name: 'test-delete-user', deleted_at: new Date() };

  user = await getRepository(User).save(data);

  expect(user.deleted_at).toBeTruthy();
});

afterAll(() => {
  connections.map((connection: Connection) => connection.close());
});
