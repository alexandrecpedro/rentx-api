"use strict";

require("dotenv/config");
var _bcrypt = require("bcrypt");
var _supertest = _interopRequireDefault(require("supertest"));
var _uuid = require("uuid");
var _app = require("@shared/infra/http/app");
var _typeorm = require("@shared/infra/typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('CreateCategoryController Integration Test', () => {
  let connection;
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)('localhost');
    await connection.runMigrations({
      transaction: 'all'
    });
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)('admin', 10);
    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values ('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`);
    await connection.query(`INSERT INTO CATEGORIES(id, name, description, created_at)
      values ('${id}', 'SUV', 'Utilitário esportivo', 'now()')`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  describe('when creating category controller', () => {
    it('should be able to create a new category', async () => {
      const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
        email: 'admin@rentx.com',
        password: 'admin'
      });

      // console.log('responseToken', responseToken);

      const {
        token
      } = responseToken.body;
      const response = await (0, _supertest.default)(_app.app).post('/categories').send({
        name: 'Rally',
        description: 'Categoria de carro de rally'
      }).set({
        Authorization: `Bearer ${token}`
      });
      expect(response.status).toBe(201);
    });
    it('should not be able to create a new category with name exists', async () => {
      const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
        email: 'admin@rentx.com',
        password: 'admin'
      });
      const {
        token
      } = responseToken.body;
      const response = await (0, _supertest.default)(_app.app).post('/categories').send({
        name: 'SUV',
        description: 'Utilitário hatch'
      }).set({
        Authorization: `Bearer ${token}`
      });
      expect(response.status).toBe(400);
    });
  });
});