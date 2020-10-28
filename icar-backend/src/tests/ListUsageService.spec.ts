import DriversRepository from '../repositories/DriversRepository';
import VehiclesRepository from '../repositories/VehiclesRepository';
import VehiclesUsagesRepository from '../repositories/VehiclesUsagesRepository';
import ListUsageService from '../services/ListUsageService';
import HireVehicleService from '../services/HireVehicleService';

describe('List Usage', () => {
  it('Should be able to show a list of all vehicles usage.', async () => {
    const vehiclesUsagesRepository = new VehiclesUsagesRepository();
    const vehiclesRepository = new VehiclesRepository();
    const driversRepository = new DriversRepository();

    const listUsageService = new ListUsageService(
      vehiclesUsagesRepository,
      vehiclesRepository,
      driversRepository,
    );

    const hireCar = new HireVehicleService(vehiclesUsagesRepository);

    const newVehicleUsage = await hireCar.execute({
      reason: 'I love this car',
      driverId: 'e4869f55-7a70-4b40-8dbd-21a99759ce91',
      vehicleId: '5d15dcae-996d-4403-87a3-610bc49c7a02',
    });

    expect(newVehicleUsage).toHaveProperty('id');

    const listUsage = await listUsageService.execute();

    expect(listUsage[0]).toHaveProperty('id');
    expect(listUsage[0]).toHaveProperty('startDate');
    expect(listUsage[0]).toHaveProperty('endDate');
    expect(listUsage[0]).toHaveProperty('reason');
    expect(listUsage[0]).toHaveProperty('driverId');
    expect(listUsage[0]).toHaveProperty('vehicleId');
    expect(listUsage[0]).toHaveProperty('driverName');
    expect(listUsage[0]).toHaveProperty('vehicleColor');
    expect(listUsage[0]).toHaveProperty('vehiclePlate');
    expect(listUsage[0]).toHaveProperty('vehicleBrand');
  });
});
