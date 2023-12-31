import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const availableCars: Car[] = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.json(availableCars);
  }
}

export { ListAvailableCarsController };
