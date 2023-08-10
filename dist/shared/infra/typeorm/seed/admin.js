"use strict";

var _bcrypt = require("bcrypt");
var _uuid = require("uuid");
var _index = require("../index");
const create = async () => {
  const connection = await (0, _index.createConnection)('localhost');
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)('admin', 10);
  await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values ('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`);
  await connection.destroy();
};
create().then(() => console.log('User admin created!'));