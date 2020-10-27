import { Router } from 'express';
import DriversRepository from '../repositories/DriversRepository';
import VehiclesRepository from '../repositories/VehiclesRepository';
import VehiclesUsagesRepository from '../repositories/VehiclesUsagesRepository';
import HireCarService from '../services/HireCarService';

const vehiclesUsageRouter = Router();
const driversRepository = new DriversRepository();
const vehiclesRepository = new VehiclesRepository();
const vehiclesUsagesRepository = new VehiclesUsagesRepository();

vehiclesUsageRouter.get('/', (request, response) => {
  const drivers = vehiclesUsagesRepository.all();

  return response.json(drivers);
});

vehiclesUsageRouter.post('/', (request, response) => {
  try {
    const { reason, driverId, vehicleId } = request.body;

    const hireCar = new HireCarService(
      vehiclesRepository,
      vehiclesUsagesRepository,
      driversRepository,
    );

    const vehicleUsage = hireCar.execute({
      reason,
      driverId,
      vehicleId,
    });

    console.log(vehiclesRepository.all());

    return response.status(200).json({
      message: 'Vehicle sucessfully borrowed.',
      vehicleUsage,
    });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

vehiclesUsageRouter.patch('/', (request, response) => {
  try {
    const { id } = request.body;

    vehiclesUsagesRepository.return({ id });
    driversRepository.driverStatusToggle(id);
    vehiclesRepository.vehicleStatusToggle(id);

    return response.status(204).json();
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default vehiclesUsageRouter;
