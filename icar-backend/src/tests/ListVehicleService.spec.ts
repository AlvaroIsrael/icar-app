import VehiclesRepository from '../repositories/VehiclesRepository';
import ListVehicleServices from '../services/ListVehicleService';

describe('List Car', () => {
  it('Should be able to show a list of vehicles by color and brand.', async () => {
    const vehiclesRepository = new VehiclesRepository();
    const listVehicleServices = new ListVehicleServices(vehiclesRepository);

    const vehicleUsage = await listVehicleServices.execute({
      color: 'Red',
      brand: 'Aston Martin',
    });

    expect(vehicleUsage).toStrictEqual([
      {
        id: '289f03b6-e68d-410a-bd72-398c5fc8db83',
        brand: 'Aston Martin',
        color: 'Red',
        plate: 'CMD-100',
      },
    ]);
  });

  it('Should be able to show a list of vehicles by color.', async () => {
    const vehiclesRepository = new VehiclesRepository();
    const listVehicleServices = new ListVehicleServices(vehiclesRepository);

    const vehicleUsage = await listVehicleServices.execute({
      color: 'Red',
      brand: undefined,
    });

    expect(vehicleUsage).toStrictEqual([
      {
        id: '289f03b6-e68d-410a-bd72-398c5fc8db83',
        brand: 'Aston Martin',
        color: 'Red',
        plate: 'CMD-100',
      },
    ]);
  });

  it('Should be able to show a list of vehicles by brand.', async () => {
    const vehiclesRepository = new VehiclesRepository();
    const listVehicleServices = new ListVehicleServices(vehiclesRepository);

    const vehicleUsage = await listVehicleServices.execute({
      color: undefined,
      brand: 'Aston Martin',
    });

    expect(vehicleUsage).toStrictEqual([
      {
        id: '289f03b6-e68d-410a-bd72-398c5fc8db83',
        brand: 'Aston Martin',
        color: 'Red',
        plate: 'CMD-100',
      },
    ]);
  });

  it('Should be able to show a list of all vehicles.', async () => {
    const vehiclesRepository = new VehiclesRepository();
    const listVehicleServices = new ListVehicleServices(vehiclesRepository);

    const vehicleUsage = await listVehicleServices.execute({
      color: undefined,
      brand: undefined,
    });

    expect(vehicleUsage).toStrictEqual([
      {
        id: '289f03b6-e68d-410a-bd72-398c5fc8db83',
        brand: 'Aston Martin',
        color: 'Red',
        plate: 'CMD-100',
      },
      {
        id: '2c012170-fddc-4fc9-bd4b-de0d3f2a3993',
        brand: 'Alfa Romeo',
        color: 'Green',
        plate: 'CMD-200',
      },
      {
        id: '430cd34c-372c-4fac-832a-68c3071b4766',
        brand: 'Audi',
        color: 'Green',
        plate: 'CMD-300',
      },
      {
        id: '5d15dcae-996d-4403-87a3-610bc49c7a02',
        brand: 'Cadillac',
        color: 'Blue',
        plate: 'CMD-400',
      },
      {
        id: '3217394f-feb0-4aa2-9eef-ae2813dc0e76',
        brand: 'Chevrolet',
        color: 'Black',
        plate: 'CMD-500',
      },
    ]);
  });
});
