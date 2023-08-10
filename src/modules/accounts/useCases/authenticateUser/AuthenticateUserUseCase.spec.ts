import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('#AuthenticateUserUseCase Unit Test', (): void => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach((): void => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('when authenticating user', (): void => {
    it('should be able to authenticate an user', async (): Promise<void> => {
      const user: ICreateUserDTO = {
        driver_license: '960926',
        email: 'illulwep@ziw.com',
        password: 'tECvt6',
        name: 'Kathryn Cole',
      };

      await createUserUseCase.execute(user);

      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      });

      expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', async (): Promise<void> => {
      await expect(
        authenticateUserUseCase.execute({
          email: 'ot@desho.sz',
          password: 'dFUY',
        })
      ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });

    it('should not be able to authenticate with incorrect password', async (): Promise<void> => {
      const user: ICreateUserDTO = {
        driver_license: 'oSE4l9',
        email: 'cael@mibpi.zm',
        password: 'YkJO',
        name: 'Bessie Haynes',
      };

      await createUserUseCase.execute(user);

      await expect(
        authenticateUserUseCase.execute({
          email: user.email,
          password: '91Rk',
        })
      ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });
  });
});
