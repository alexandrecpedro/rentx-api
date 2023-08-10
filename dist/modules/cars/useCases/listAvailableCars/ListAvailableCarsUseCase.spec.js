"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");
describe('#ListAvailableCarsUseCase Unit Test', () => {
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
  let listAvailableCarsUseCase;
  let carsRepositoryInMemory;
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when listing cars', () => {
    it('should be able to list all available cars', async () => {
      const car = await carsRepositoryInMemory.create(car1);
      const cars = await listAvailableCarsUseCase.execute({});
      expect(cars).toEqual([car]);
    });
    it('should be able to list all available cars by brand', async () => {
      const car = await carsRepositoryInMemory.create(car2);
      const cars = await listAvailableCarsUseCase.execute({
        brand: 'Bugatti'
      });
      expect(cars).toEqual([car]);
    });
    it('should be able to list all available cars by name', async () => {
      const newCar = {
        ...car1,
        name: 'Audi R8',
        description: 'Audi R8 V10 Performance'
      };
      const car = await carsRepositoryInMemory.create(newCar);
      const cars = await listAvailableCarsUseCase.execute({
        name: 'Audi R8'
      });
      expect(cars).toEqual([car]);
    });
    it('should be able to list all available cars by category', async () => {
      const newCar = {
        ...car2,
        category_id: 'Super Sport'
      };
      const car = await carsRepositoryInMemory.create(newCar);
      const cars = await listAvailableCarsUseCase.execute({
        category_id: 'Super Sport'
      });
      expect(cars).toEqual([car]);
    });
  });
});