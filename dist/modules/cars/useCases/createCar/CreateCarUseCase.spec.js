"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var _AppError = require("@shared/errors/AppError");
var _CreateCarUseCase = require("./CreateCarUseCase");
describe('#CreateCarUseCase Unit Test', () => {
  const car1 = {
    name: 'Koenigsegg Regera',
    description: 'Koenigsegg Regera',
    daily_rate: 300,
    license_plate: 'ABC-1234',
    fine_amount: 154,
    brand: 'Koenigsegg',
    category_id: 'MEWPWL'
  };
  const car2 = {
    name: 'Bugatti Veyron',
    description: 'Bugatti Veyron EB 16.4',
    daily_rate: 432,
    license_plate: 'ABC-1234',
    fine_amount: 217,
    brand: 'Bugatti',
    category_id: 'QVSJVK'
  };
  let carsRepositoryInMemory;
  let createCarUseCase;
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when creating car', () => {
    it('should be able to create a new car', async () => {
      const car = await createCarUseCase.execute(car1);
      expect(car).toHaveProperty('id');
      expect(car).toMatchObject(car1);
    });
    it('should be able to create a car with available true by default', async () => {
      const car = await createCarUseCase.execute(car1);
      expect(car.available).toBe(true);
    });
    it('should not be able to create a car with existing license plate', async () => {
      expect(async () => {
        await createCarUseCase.execute(car1);
        await createCarUseCase.execute(car2);
      }).rejects.toEqual(new _AppError.AppError('Car already exists!'));
    });
  });
});