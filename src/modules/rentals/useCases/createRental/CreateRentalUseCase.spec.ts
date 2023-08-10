import dayjs from 'dayjs';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('#CreateRentalUseCase Unit Test', (): void => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  const createCar: ICreateCarDTO = {
    name: 'Koenigsegg Regera',
    description: 'Koenigsegg Regera',
    daily_rate: 300,
    license_plate: 'ABC-1234',
    fine_amount: 154,
    brand: 'Koenigsegg',
    category_id: 'MEWPWL',
  };

  const createRental: ICreateRentalDTO = {
    user_id: '38458',
    car_id: '69576',
    expected_return_date: dayAdd24Hours,
  };

  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let createRentalUseCase: CreateRentalUseCase;
  let dayjsProvider: DayjsDateProvider;
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('when creating a rental', (): void => {
    it('should be able to create a new rental', async (): Promise<void> => {
      const car = await carsRepositoryInMemory.create(createCar);

      const rental = await createRentalUseCase.execute({
        ...createRental,
        car_id: car.id,
      });

      expect(rental).toHaveProperty('id');
      expect(rental).toHaveProperty('start_date');
    });

    it('should not be able to create a new rental if there is another open to the same user', async (): Promise<void> => {
      await rentalsRepositoryInMemory.create(createRental);

      await expect(
        createRentalUseCase.execute({
          ...createRental,
          car_id: '19616',
        })
      ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
    });

    it('should not be able to create a new rental if there is another open to the same car', async (): Promise<void> => {
      await rentalsRepositoryInMemory.create(createRental);

      await expect(
        createRentalUseCase.execute({
          ...createRental,
          user_id: '33583',
        })
      ).rejects.toEqual(new AppError('Car is unavailable'));
    });

    it('should not be able to create a new rental with invalid return time', async (): Promise<void> => {
      await expect(
        createRentalUseCase.execute({
          ...createRental,
          expected_return_date: dayjs().toDate(),
        })
      ).rejects.toEqual(new AppError('Invalid return time!'));
    });
  });
});
