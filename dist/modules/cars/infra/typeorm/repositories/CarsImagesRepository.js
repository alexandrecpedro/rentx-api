"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImagesRepository = void 0;
var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));
var _CarImage = require("../entities/CarImage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CarsImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.default.getRepository(_CarImage.CarImage);
  }
  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImage);
    return carImage;
  }
}
exports.CarsImagesRepository = CarsImagesRepository;