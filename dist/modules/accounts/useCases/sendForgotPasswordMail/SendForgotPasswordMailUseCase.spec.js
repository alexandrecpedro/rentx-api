"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
var _AppError = require("@shared/errors/AppError");
var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");
describe('#SendForgotPasswordMailUseCase Unit Test', () => {
  let usersRepositoryInMemory;
  let usersTokensRepositoryInMemory;
  let dateProvider;
  let mailProvider;
  let sendForgotPasswordMailUseCase;
  describe('when sending forgot password mail', () => {
    beforeEach(() => {
      usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
      usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
      mailProvider = new _MailProviderInMemory.MailProviderInMemory();
      dateProvider = new _DayjsDateProvider.DayjsDateProvider();
      sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should be able to send a forgot password mail to user', async () => {
      const sendMail = jest.spyOn(mailProvider, 'sendMail');
      await usersRepositoryInMemory.create({
        driver_license: '435955',
        email: 'rameuwo@oza.sd',
        name: 'Clayton Burns',
        password: '3446'
      });
      await sendForgotPasswordMailUseCase.execute('rameuwo@oza.sd');
      expect(sendMail).toHaveBeenCalled();
    });
    it('should not be able to send an email if user does not exists', async () => {
      await expect(sendForgotPasswordMailUseCase.execute('fetak@han.tc')).rejects.toEqual(new _AppError.AppError('User does not exist!'));
    });
    it('should be able to create an users token', async () => {
      const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');
      await usersRepositoryInMemory.create({
        driver_license: '915383',
        email: 'vicvok@diikecuz.bw',
        name: 'Matilda Wood',
        password: '3567'
      });
      await sendForgotPasswordMailUseCase.execute('vicvok@diikecuz.bw');
      expect(generateTokenMail).toHaveBeenCalled();
    });
  });
});