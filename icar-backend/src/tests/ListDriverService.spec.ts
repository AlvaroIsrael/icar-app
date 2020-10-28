import DriversRepository from '../repositories/DriversRepository';
import ListDriverService from '../services/ListDriverService';

describe('List Driver', () => {
  it('Should be able to show a list of drivers by name', async () => {
    const driversRepository = new DriversRepository();
    const listDriverServices = new ListDriverService(driversRepository);

    const vehicleUsage = await listDriverServices.execute({
      name: 'Sara Mills',
    });

    expect(vehicleUsage).toStrictEqual([
      {
        id: '4dd67905-4c33-49be-b08c-0cdff8bfb842',
        name: 'Sara Mills',
      },
    ]);
  });

  it('Should be able to show a list of all drivers.', async () => {
    const driversRepository = new DriversRepository();
    const listDriverServices = new ListDriverService(driversRepository);

    const vehicleUsage = await listDriverServices.execute({
      name: undefined,
    });

    expect(vehicleUsage).toStrictEqual([
      {
        id: '4dd67905-4c33-49be-b08c-0cdff8bfb842',
        name: 'Sara Mills',
      },
      {
        id: '6d3f724c-b811-4062-8da9-824a4f6cf7c3',
        name: 'Frank Elliott',
      },
      {
        id: 'e4869f55-7a70-4b40-8dbd-21a99759ce91',
        name: 'Faye Walsh',
      },
      {
        id: '634275a5-bb76-4a0c-ad5c-c810afdaa882',
        name: 'Ellie Simmons',
      },
      {
        id: 'd473cf83-9445-4f32-b14b-4195af645138',
        name: 'Joshua Harris',
      },
    ]);
  });
});
