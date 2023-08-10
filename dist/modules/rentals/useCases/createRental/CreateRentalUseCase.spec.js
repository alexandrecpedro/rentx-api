"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));
var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("@shared/errors/AppError");
var _CreateRentalUseCase = require("./CreateRentalUseCase");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('#CreateRentalUseCase Unit Test', () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  const createCar = {
    name: 'Koenigsegg Regera',
    description: 'Koenigsegg Regera',
    daily_rate: 300,
    license_plate: 'ABC-1234',
    fine_amount: 154,
    brand: 'Koenigsegg',
    category_id: 'MEWPWL'
  };
  const createRental = {
    user_id: '38458',
    car_id: '69576',
    expected_return_date: dayAdd24Hours
  };
  let carsRepositoryInMemory;
  let createRentalUseCase;
  let dayjsProvider;
  let rentalsRepositoryInMemory;
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayjsProvider = new _DayjsDateProvider.DayjsDateProvider();
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsProvider, carsRepositoryInMemory);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when creating a rental', () => {
    it('should be able to create a new rental', async () => {
      const car = await carsRepositoryInMemory.create(createCar);
      const rental = await createRentalUseCase.execute({
        ...createRental,
        car_id: car.id
      });
      expect(rental).toHaveProperty('id');
      expect(rental).toHaveProperty('start_date');
    });
    it('should not be able to create a new rental if there is another open to the same user', async () => {
      await rentalsRepositoryInMemory.create(createRental);
      await expect(createRentalUseCase.execute({
        ...createRental,
        car_id: '19616'
      })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!"));
    });
    it('should not be able to create a new rental if there is another open to the same car', async () => {
      await rentalsRepositoryInMemory.create(createRental);
      await expect(createRentalUseCase.execute({
        ...createRental,
        user_id: '33583'
      })).rejects.toEqual(new _AppError.AppError('Car is unavailable'));
    });
    it('should not be able to create a new rental with invalid return time', async () => {
      await expect(createRentalUseCase.execute({
        ...createRental,
        expected_return_date: (0, _dayjs.default)().toDate()
      })).rejects.toEqual(new _AppError.AppError('Invalid return time!'));
    });
  });
});