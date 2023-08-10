"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
require("reflect-metadata");
require("dotenv/config");
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _swaggerUiExpress = require("swagger-ui-express");
require("@shared/container");
var _upload = _interopRequireDefault(require("@config/upload"));
var _AppError = require("@shared/errors/AppError");
var _swagger = _interopRequireDefault(require("../../../swagger.json"));
var _routes = require("./routes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use('/api/api-docs', _swaggerUiExpress.serve, (0, _swaggerUiExpress.setup)(_swagger.default));
app.use('/avatar', _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use('/cars', _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use((0, _cors.default)());
app.use('/api', _routes.router);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});