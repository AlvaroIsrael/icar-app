import AppError from '../errors/AppError';
import VehiclesUsagesRepository from '../repositories/VehiclesUsagesRepository';
import HireCarService from '../services/HireVehicleService';

describe('Hire Car', () => {
  it('Should be able to hire a vehicle.', async () => {
    const vehiclesUsagesRepository = new VehiclesUsagesRepository();
    const hireCarService = new HireCarService(vehiclesUsagesRepository);

    const vehicleUsage = await hireCarService.execute({
      reason: 'I like this car!',
      driverId: 'b3c709ae-3afb-443a-a9f9-2c645c57adbe',
      vehicleId: '634275a5-bb76-4a0c-ad5c-c810afdaa882',
    });

    expect(vehicleUsage).toHaveProperty('id');
    expect(vehicleUsage.reason).toBe('I like this car!');
    expect(vehicleUsage.driverId).toBe('b3c709ae-3afb-443a-a9f9-2c645c57adbe');
    expect(vehicleUsage.vehicleId).toBe('634275a5-bb76-4a0c-ad5c-c810afdaa882');
  });

  it('Should not be able to drive more than one car at the same time.', async () => {
    const vehiclesUsagesRepository = new VehiclesUsagesRepository();
    const hireCarService = new HireCarService(vehiclesUsagesRepository);

    const oneDriverOneCar = await hireCarService.execute({
      reason: 'I like this car too!',
      driverId: 'b3c709ae-3afb-443a-a9f9-2c645c57adbe',
      vehicleId: '634275a5-bb76-4a0c-ad5c-c810afdaa882',
    });

    expect(oneDriverOneCar).toHaveProperty('id');

    try {
      const oneDriverSameCar = await hireCarService.execute({
        reason: 'I like this car too!',
        driverId: 'b3c709ae-3afb-443a-a9f9-2c645c57adbe',
        vehicleId: '634275a5-bb76-4a0c-ad5c-c810afdaa882',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }

    try {
      const anotherDriverSameCar = await hireCarService.execute({
        reason: 'I like this car too!',
        driverId: '4dd67905-4c33-49be-b08c-0cdff8bfb842',
        vehicleId: '634275a5-bb76-4a0c-ad5c-c810afdaa882',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('Should not be able to have more than one driver at the same time.', async () => {
    const vehiclesUsagesRepository = new VehiclesUsagesRepository();
    const hireCarService = new HireCarService(vehiclesUsagesRepository);

    const oneDriverOneCar = await hireCarService.execute({
      reason: 'I like this car too!',
      driverId: 'b3c709ae-3afb-443a-a9f9-2c645c57adbe',
      vehicleId: '634275a5-bb76-4a0c-ad5c-c810afdaa882',
    });

    expect(oneDriverOneCar).toHaveProperty('id');

    try {
      const sameDriverAnotherCar = await hireCarService.execute({
        reason: 'I like this car too!',
        driverId: 'b3c709ae-3afb-443a-a9f9-2c645c57adbe',
        vehicleId: '6d3f724c-b811-4062-8da9-824a4f6cf7c3',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
