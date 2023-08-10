"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var _SpecificationsRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
var _AppError = require("@shared/errors/AppError");
var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");
describe('#CreateCarSpecificationUseCase Unit Test', () => {
  let carsRepositoryInMemory;
  let createCarSpecificationUseCase;
  let specificationsRepositoryInMemory;
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when creating car specification', () => {
    it('should be able to add a new specification to the car', async () => {
      const car = await carsRepositoryInMemory.create({
        name: 'Koenigsegg Regera',
        description: 'Koenigsegg Regera',
        daily_rate: 300,
        license_plate: 'ABC-1234',
        fine_amount: 154,
        brand: 'Koenigsegg',
        category_id: 'MEWPWL'
      });
      const specification = await specificationsRepositoryInMemory.create({
        description: 'Carro com câmbio automático',
        name: 'Câmbio automático'
      });
      const specifications_id = [specification.id];
      const specificationsCars = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_id
      });
      expect(specificationsCars).toHaveProperty('specifications');
      expect(specificationsCars.specifications.length).toBe(1);
    });
    it('should not be able to add a new specification to a non-existing car', async () => {
      const car_id = '8778';
      const specifications_id = ['27209'];
      expect(createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      })).rejects.toEqual(new _AppError.AppError('Car does not exist!'));
    });
  });
});