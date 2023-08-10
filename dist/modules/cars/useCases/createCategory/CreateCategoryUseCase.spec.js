"use strict";

var _CategoriesRepositoryInMemory = require("@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory");
var _AppError = require("@shared/errors/AppError");
var _CreateCategoryUseCase = require("./CreateCategoryUseCase");
describe('#CreateCategoryUseCase Unit Test', () => {
  let createCategoryUseCase;
  let categoriesRepositoryInMemory;
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when creating category', () => {
    it('should be able to create a new category', async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description test'
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
      const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);
      expect(createdCategory).toHaveProperty('id');
    });
    it('should not be able to create a new category with existing name', async () => {
      expect(async () => {
        const category = {
          name: 'Category Test',
          description: 'Category description test'
        };
        await createCategoryUseCase.execute({
          name: category.name,
          description: category.description
        });
        await createCategoryUseCase.execute({
          name: category.name,
          description: category.description
        });
      }).rejects.toBeInstanceOf(_AppError.AppError);
    });
  });
});