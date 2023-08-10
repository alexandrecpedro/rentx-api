import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category: Category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}

export { CategoriesRepositoryInMemory };
