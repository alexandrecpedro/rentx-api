import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import {
  CreateCategoryUseCase,
  IRequestCategory,
} from './CreateCategoryUseCase';

describe('#CreateCategoryUseCase Unit Test', (): void => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach((): void => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('when creating category', (): void => {
    it('should be able to create a new category', async (): Promise<void> => {
      const category: IRequestCategory = {
        name: 'Category Test',
        description: 'Category description test',
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      const createdCategory = await categoriesRepositoryInMemory.findByName(
        category.name
      );

      expect(createdCategory).toHaveProperty('id');
    });

    it('should not be able to create a new category with existing name', async (): Promise<void> => {
      expect(async (): Promise<void> => {
        const category: IRequestCategory = {
          name: 'Category Test',
          description: 'Category description test',
        };

        await createCategoryUseCase.execute({
          name: category.name,
          description: category.description,
        });

        await createCategoryUseCase.execute({
          name: category.name,
          description: category.description,
        });
      }).rejects.toBeInstanceOf(AppError);
    });
  });
});
