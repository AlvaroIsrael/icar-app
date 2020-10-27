import { Router } from 'express';
import VehiclesUsagesRepository from '../repositories/VehiclesUsagesRepository';
import VehiclesRepository from '../repositories/VehiclesRepository';
import DriversRepository from '../repositories/DriversRepository';
import HireCarService from '../services/HireCarService';
import ListUsageService from '../services/ListUsageService';

const vehiclesUsageRouter = Router();
const vehiclesUsagesRepository = new VehiclesUsagesRepository();
const vehiclesRepository = new VehiclesRepository();
const driversRepository = new DriversRepository();

/* Regisers a new usage of a car by one driver. */
vehiclesUsageRouter.post('/', (request, response) => {
  try {
    const { reason, driverId, vehicleId } = request.body;

    const hireCar = new HireCarService(vehiclesUsagesRepository);

    const vehicleUsage = hireCar.execute({
      reason,
      driverId,
      vehicleId,
    });

    return response.status(200).json({
      message: 'Vehicle sucessfully borrowed.',
      vehicleUsage,
    });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

/* Regisers a termination's date of a vehicle's usage by one driver. */
vehiclesUsageRouter.patch('/', (request, response) => {
  try {
    const { id } = request.body;

    vehiclesUsagesRepository.return({ id });

    return response.status(204).json();
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

/* Returns a list of all vehicles usage in the system. */
vehiclesUsageRouter.get('/', (request, response) => {
  const usageList = new ListUsageService(
    vehiclesUsagesRepository,
    vehiclesRepository,
    driversRepository,
  );

  const usage = usageList.execute();

  return response.status(200).json(usage);
});

export default vehiclesUsageRouter;
