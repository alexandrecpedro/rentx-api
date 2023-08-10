"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = void 0;
var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");
var _AppError = require("@shared/errors/AppError");
const ensureAdmin = async (request, response, next) => {
  const {
    id
  } = request.user;
  const usersRepository = new _UsersRepository.UsersRepository();
  const user = await usersRepository.findById(id);
  if (!user.isAdmin) throw new _AppError.AppError(`User isn't admin!`);
  return next();
};
exports.ensureAdmin = ensureAdmin;