"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;
var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));
var _UserTokens = require("../entities/UserTokens");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.default.getRepository(_UserTokens.UserTokens);
  }
  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.repository.save(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const usersTokens = await this.repository.findOneBy({
      user_id,
      refresh_token
    });
    return usersTokens;
  }
  async deleteById(id) {
    await this.repository.delete(id);
  }
  async findByRefreshToken(refresh_token) {
    const userToken = await this.repository.findOneBy({
      refresh_token
    });
    return userToken;
  }
}
exports.UsersTokensRepository = UsersTokensRepository;