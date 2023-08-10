"use strict";

var _typeorm = require("@shared/infra/typeorm");
var _app = require("./app");
(0, _typeorm.createConnection)();
const port = Number(process.env.PORT) || 3333;
_app.app.listen(port, () => console.log(`Server is running at port ${port}`));