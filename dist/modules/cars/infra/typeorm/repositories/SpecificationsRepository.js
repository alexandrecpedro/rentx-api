"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;
var _typeorm = require("typeorm");
var _typeorm2 = _interopRequireDefault(require("@shared/infra/typeorm"));
var _Specification = require("../entities/Specification");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm2.default.getRepository(_Specification.Specification);
  }
  async create({
    description,
    name
  }) {
    const specification = this.repository.create({
      description,
      name
    });
    await this.repository.save(specification);
    return specification;
  }
  async findByName(name) {
    // Select * from categories where name = "name" limit 1
    const specification = await this.repository.findOneBy({
      name
    });
    return specification;
  }
  async findByIds(ids) {
    const specifications = await this.repository.findBy({
      id: (0, _typeorm.In)(ids)
    });
    return specifications;
  }
}
exports.SpecificationsRepository = SpecificationsRepository;