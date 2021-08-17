import { createConnections } from 'typeorm';
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

(async () => {
  await createConnections([
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
    {
      name: 'app_db',
      type: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: ['src/database/app/entity/*.ts'],
      synchronize: true,
    },
  ]);
})();
