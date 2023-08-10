"use strict";

var _bcrypt = require("bcrypt");
var _supertest = _interopRequireDefault(require("supertest"));
var _uuid = require("uuid");
var _app = require("@shared/infra/http/app");
var _typeorm = require("@shared/infra/typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('ListCategoriesController Integration Test', () => {
  describe('when listing category controller', () => {
    let connection;
    beforeAll(async () => {
      connection = await (0, _typeorm.createConnection)('localhost');
      await connection.runMigrations();
      const id = (0, _uuid.v4)();
      const password = await (0, _bcrypt.hash)('admin', 8);
      await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
          values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`);
      await connection.query(`INSERT INTO CATEGORIES(id, name, description, created_at)
        values ('${id}', 'SUV', 'Utilitário esportivo', 'now()')`);
    });
    afterAll(async () => {
      await connection.dropDatabase();
      await connection.destroy();
    });
    it('should be able to list all categories', async () => {
      const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
        email: 'admin@rentx.com',
        password: 'admin'
      });
      const {
        token
      } = responseToken.body;
      await (0, _supertest.default)(_app.app).post('/categories').send({
        name: 'Category Supertest',
        description: 'Category Supertest'
      }).set({
        Authorization: `Bearer ${token}`
      });
      const response = await (0, _supertest.default)(_app.app).get('/categories');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0].name).toEqual('Category Supertest');
    });
  });
});