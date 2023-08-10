import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});

export function createConnection(host = 'localhost'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
