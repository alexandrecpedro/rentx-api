import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

describe('#ListAvailableCarsUseCase Unit Test', (): void => {
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

  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach((): void => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('when listing cars', (): void => {
    it('should be able to list all available cars', async (): Promise<void> => {
      const car = await carsRepositoryInMemory.create(car1);

      const cars = await listAvailableCarsUseCase.execute({});

      expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by brand', async (): Promise<void> => {
      const car = await carsRepositoryInMemory.create(car2);

      const cars = await listAvailableCarsUseCase.execute({ brand: 'Bugatti' });

      expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by name', async (): Promise<void> => {
      const newCar: ICreateCarDTO = {
        ...car1,
        name: 'Audi R8',
        description: 'Audi R8 V10 Performance',
      };
      const car = await carsRepositoryInMemory.create(newCar);

      const cars = await listAvailableCarsUseCase.execute({ name: 'Audi R8' });

      expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by category', async (): Promise<void> => {
      const newCar: ICreateCarDTO = {
        ...car2,
        category_id: 'Super Sport',
      };
      const car = await carsRepositoryInMemory.create(newCar);

      const cars = await listAvailableCarsUseCase.execute({
        category_id: 'Super Sport',
      });

      expect(cars).toEqual([car]);
    });
  });
});
