import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import VehiclesUsagesRepository from '../repositories/VehiclesUsagesRepository';
import VehiclesRepository from '../repositories/VehiclesRepository';
import DriversRepository from '../repositories/DriversRepository';
import HireVehicleService from '../services/HireVehicleService';
import ListUsageService from '../services/ListUsageService';
import AppError from '../errors/AppError';

const vehiclesUsageRouter = Router();
const vehiclesUsagesRepository = new VehiclesUsagesRepository();
const vehiclesRepository = new VehiclesRepository();
const driversRepository = new DriversRepository();

/* Regisers a new usage of a car by one driver. */
vehiclesUsageRouter.post('/', async (request, response) => {
  try {
    const { reason, driverId, vehicleId } = request.body;

    const hireCar = new HireVehicleService(vehiclesUsagesRepository);

    const vehicleUsage = await hireCar.execute({
      reason,
      driverId,
      vehicleId,
    });

    return response.status(200).json({
      message: 'Vehicle sucessfully borrowed.',
      vehicleUsage,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ erro: error.message });
    }
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

/* Regisers a termination's date of a vehicle's usage by one driver. */
vehiclesUsageRouter.patch('/', async (request, response) => {
  try {
    const { id } = request.body;

    await vehiclesUsagesRepository.return({ id });

    return response.status(204).json();
  } catch (error) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ erro: error.message });
    }
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

/* Returns a list of all vehicles usage in the system. */
vehiclesUsageRouter.get('/', async (request, response) => {
  const usageList = new ListUsageService(vehiclesUsagesRepository, vehiclesRepository, driversRepository);

  const usage = await usageList.execute();

  return response.status(200).json(usage);
});

export default vehiclesUsageRouter;
