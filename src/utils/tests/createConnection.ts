import { Connection, createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

export async function connect(): Promise<Connection> {
  useContainer(Container);

  return createConnection({
    type: 'sqlite',
    database: `${process.cwd()}/src/__tests__/db.sqlite`,
    entities: ['src/database/app/entity/*.ts'],
    synchronize: true,
  });
}
