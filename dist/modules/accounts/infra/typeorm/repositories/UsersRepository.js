"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;
var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));
var _User = require("../entities/User");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.default.getRepository(_User.User);
  }
  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    id
  }) {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id
    });
    await this.repository.save(user);
  }
  async findByEmail(email) {
    const user = await this.repository.findOneBy({
      email
    });
    return user;
  }
  async findById(id) {
    const user = await this.repository.findOneBy({
      id
    });
    return user;
  }
}
exports.UsersRepository = UsersRepository;