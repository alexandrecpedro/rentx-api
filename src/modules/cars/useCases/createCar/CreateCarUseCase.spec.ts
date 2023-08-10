import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

describe('#CreateCarUseCase Unit Test', (): void => {
  const car1: ICreateCarDTO = {
    name: 'Koenigsegg Regera',
    description: 'Koenigsegg Regera',
    daily_rate: 300,
    license_plate: 'ABC-1234',
    fine_amount: 154,
    brand: 'Koenigsegg',
    category_id: 'MEWPWL',
  };

  const car2: ICreateCarDTO = {
    name: 'Bugatti Veyron',
    description: 'Bugatti Veyron EB 16.4',
    daily_rate: 432,
    license_plate: 'ABC-1234',
    fine_amount: 217,
    brand: 'Bugatti',
    category_id: 'QVSJVK',
  };

  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let createCarUseCase: CreateCarUseCase;

  beforeEach((): void => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('when creating car', (): void => {
    it('should be able to create a new car', async (): Promise<void> => {
      const car = await createCarUseCase.execute(car1);

      expect(car).toHaveProperty('id');
      expect(car).toMatchObject(car1);
    });

    it('should be able to create a car with available true by default', async (): Promise<void> => {
      const car = await createCarUseCase.execute(car1);

      expect(car.available).toBe(true);
    });

    it('should not be able to create a car with existing license plate', async (): Promise<void> => {
      expect(async (): Promise<void> => {
        await createCarUseCase.execute(car1);

        await createCarUseCase.execute(car2);
      }).rejects.toEqual(new AppError('Car already exists!'));
    });
  });
});
