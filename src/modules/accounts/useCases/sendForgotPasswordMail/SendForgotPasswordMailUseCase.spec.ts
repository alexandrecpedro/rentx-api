import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

describe('#SendForgotPasswordMailUseCase Unit Test', (): void => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

  describe('when sending forgot password mail', (): void => {
    beforeEach((): void => {
      usersRepositoryInMemory = new UsersRepositoryInMemory();
      usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
      mailProvider = new MailProviderInMemory();
      dateProvider = new DayjsDateProvider();

      sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
        usersRepositoryInMemory,
        usersTokensRepositoryInMemory,
        dateProvider,
        mailProvider
      );
    });

    afterEach((): void => {
      jest.clearAllMocks();
    });

    it('should be able to send a forgot password mail to user', async (): Promise<void> => {
      const sendMail = jest.spyOn(mailProvider, 'sendMail');

      await usersRepositoryInMemory.create({
        driver_license: '435955',
        email: 'rameuwo@oza.sd',
        name: 'Clayton Burns',
        password: '3446',
      });

      await sendForgotPasswordMailUseCase.execute('rameuwo@oza.sd');

      expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to send an email if user does not exists', async (): Promise<void> => {
      await expect(
        sendForgotPasswordMailUseCase.execute('fetak@han.tc')
      ).rejects.toEqual(new AppError('User does not exist!'));
    });

    it('should be able to create an users token', async (): Promise<void> => {
      const generateTokenMail = jest.spyOn(
        usersTokensRepositoryInMemory,
        'create'
      );

      await usersRepositoryInMemory.create({
        driver_license: '915383',
        email: 'vicvok@diikecuz.bw',
        name: 'Matilda Wood',
        password: '3567',
      });

      await sendForgotPasswordMailUseCase.execute('vicvok@diikecuz.bw');

      expect(generateTokenMail).toHaveBeenCalled();
    });
  });
});
