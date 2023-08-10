"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnection = createConnection;
exports.default = void 0;
require("dotenv/config");
require("reflect-metadata");
var _typeorm = require("typeorm");
const dataSource = new _typeorm.DataSource({
  type: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts']
});
function createConnection(host = 'localhost') {
  return dataSource.setOptions({
    host
  }).initialize();
}
var _default = dataSource;
exports.default = _default;