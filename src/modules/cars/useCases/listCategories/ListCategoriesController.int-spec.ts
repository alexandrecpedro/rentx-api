import { hash } from 'bcrypt';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import { createConnection } from '@shared/infra/typeorm';

describe('ListCategoriesController Integration Test', (): void => {
  describe('when listing category controller', (): void => {
    let connection: DataSource;

    beforeAll(async () => {
      connection = await createConnection('localhost');
      await connection.runMigrations();

      const id = uuidv4();
      const password = await hash('admin', 8);

      await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
          values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`
      );

      await connection.query(
        `INSERT INTO CATEGORIES(id, name, description, created_at)
        values ('${id}', 'SUV', 'Utilitário esportivo', 'now()')`
      );
    });

    afterAll(async () => {
      await connection.dropDatabase();
      await connection.destroy();
    });

    it('should be able to list all categories', async () => {
      const responseToken = await request(app).post('/sessions').send({
        email: 'admin@rentx.com',
        password: 'admin',
      });

      const { token } = responseToken.body;

      await request(app)
        .post('/categories')
        .send({
          name: 'Category Supertest',
          description: 'Category Supertest',
        })
        .set({
          Authorization: `Bearer ${token}`,
        });

      const response = await request(app).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0].name).toEqual('Category Supertest');
    });
  });
});
