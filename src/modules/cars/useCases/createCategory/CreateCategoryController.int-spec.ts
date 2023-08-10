import 'dotenv/config';
import { hash } from 'bcrypt';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import { createConnection } from '@shared/infra/typeorm';

describe('CreateCategoryController Integration Test', (): void => {
  let connection: DataSource;

  beforeAll(async (): Promise<void> => {
    connection = await createConnection('localhost');
    await connection.runMigrations({
      transaction: 'all',
    });

    const id = uuidv4();
    const password = await hash('admin', 10);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values ('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`
    );

    await connection.query(
      `INSERT INTO CATEGORIES(id, name, description, created_at)
      values ('${id}', 'SUV', 'Utilitário esportivo', 'now()')`
    );
  });

  afterAll(async (): Promise<void> => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  describe('when creating category controller', (): void => {
    it('should be able to create a new category', async (): Promise<void> => {
      const responseToken = await request(app).post('/sessions').send({
        email: 'admin@rentx.com',
        password: 'admin',
      });

      // console.log('responseToken', responseToken);

      const { token } = responseToken.body;

      const response = await request(app)
        .post('/categories')
        .send({
          name: 'Rally',
          description: 'Categoria de carro de rally',
        })
        .set({
          Authorization: `Bearer ${token}`,
        });

      expect(response.status).toBe(201);
    });

    it('should not be able to create a new category with name exists', async (): Promise<void> => {
      const responseToken = await request(app).post('/sessions').send({
        email: 'admin@rentx.com',
        password: 'admin',
      });

      const { token } = responseToken.body;

      const response = await request(app)
        .post('/categories')
        .send({
          name: 'SUV',
          description: 'Utilitário hatch',
        })
        .set({
          Authorization: `Bearer ${token}`,
        });

      expect(response.status).toBe(400);
    });
  });
});
