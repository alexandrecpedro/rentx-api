"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = void 0;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("@config/auth"));
var _AppError = require("@shared/errors/AppError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ensureAuthenticated = async (request, response, next) => {
  const authHeaders = request.headers.authorization;
  if (!authHeaders) throw new _AppError.AppError('Token missing', 401);
  const [, token] = authHeaders.split(' ');
  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    request.user = {
      id: user_id
    };
    next();
  } catch (error) {
    throw new _AppError.AppError('Invalid token!', 401);
  }
};
exports.ensureAuthenticated = ensureAuthenticated;