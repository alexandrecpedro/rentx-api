"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;
var _Category = require("@modules/cars/infra/typeorm/entities/Category");
class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }
  async create({
    description,
    name
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    });
    this.categories.push(category);
  }
  async list() {
    return this.categories;
  }
  async findByName(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}
exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;