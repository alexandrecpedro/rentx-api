import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

describe('#CreateCarSpecificationUseCase Unit Test', (): void => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

  beforeEach((): void => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('when creating car specification', (): void => {
    it('should be able to add a new specification to the car', async (): Promise<void> => {
      const car = await carsRepositoryInMemory.create({
        name: 'Koenigsegg Regera',
        description: 'Koenigsegg Regera',
        daily_rate: 300,
        license_plate: 'ABC-1234',
        fine_amount: 154,
        brand: 'Koenigsegg',
        category_id: 'MEWPWL',
      });

      const specification = await specificationsRepositoryInMemory.create({
        description: 'Carro com câmbio automático',
        name: 'Câmbio automático',
      });

      const specifications_id = [specification.id];

      const specificationsCars = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_id,
      });

      expect(specificationsCars).toHaveProperty('specifications');
      expect(specificationsCars.specifications.length).toBe(1);
    });

    it('should not be able to add a new specification to a non-existing car', async (): Promise<void> => {
      const car_id: string = '8778';
      const specifications_id: string[] = ['27209'];
      expect(
        createCarSpecificationUseCase.execute({
          car_id,
          specifications_id,
        })
      ).rejects.toEqual(new AppError('Car does not exist!'));
    });
  });
});
