"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("@shared/errors/AppError");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
describe('#AuthenticateUserUseCase Unit Test', () => {
  let usersRepositoryInMemory;
  let usersTokensRepositoryInMemory;
  let dateProvider;
  let createUserUseCase;
  let authenticateUserUseCase;
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when authenticating user', () => {
    it('should be able to authenticate an user', async () => {
      const user = {
        driver_license: '960926',
        email: 'illulwep@ziw.com',
        password: 'tECvt6',
        name: 'Kathryn Cole'
      };
      await createUserUseCase.execute(user);
      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password
      });
      expect(result).toHaveProperty('token');
    });
    it('should not be able to authenticate an nonexistent user', async () => {
      await expect(authenticateUserUseCase.execute({
        email: 'ot@desho.sz',
        password: 'dFUY'
      })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
    });
    it('should not be able to authenticate with incorrect password', async () => {
      const user = {
        driver_license: 'oSE4l9',
        email: 'cael@mibpi.zm',
        password: 'YkJO',
        name: 'Bessie Haynes'
      };
      await createUserUseCase.execute(user);
      await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: '91Rk'
      })).rejects.toEqual(new _AppError.AppError('Email or password incorrect!'));
    });
  });
});