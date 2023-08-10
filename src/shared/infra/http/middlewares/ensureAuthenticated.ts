import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) throw new AppError('Token missing', 401);

  const [, token] = authHeaders.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
};
