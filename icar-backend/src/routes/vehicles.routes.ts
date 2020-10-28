import { Router } from 'express';
import VehiclesRepository from '../repositories/VehiclesRepository';
import ListVehicleService from '../services/ListVehicleService';

const vehiclesRouter = Router();
const vehiclesRepository = new VehiclesRepository();

/* Creates a new vehicle. */
vehiclesRouter.post('/', async (request, response) => {
  const { brand, color, plate } = request.body;

  const car = await vehiclesRepository.create({ brand, color, plate });

  return response.status(200).json(car);
});

/* Updates a vehicle. */
vehiclesRouter.put('/', async (request, response) => {
  const { id, brand, color, plate } = request.body;

  await vehiclesRepository.update({ id, brand, color, plate });

  return response.status(204).json();
});

/* Removes a vehicle. */
vehiclesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  vehiclesRepository.remove(id);

  return response.status(204).json();
});

/* Finds and return a vehicle filtering by it's color OR brand.
   If no filter is provided then all the vehicles are returned. */
vehiclesRouter.get('/', async (request, response) => {
  const color = request.query.color as string;
  const brand = request.query.brand as string;

  const listCars = new ListVehicleService(vehiclesRepository);

  const vehicles = await listCars.execute({ color, brand });

  return response.status(200).json(vehicles);
});

/* Finds and return a vehicle by it's id. */
vehiclesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const vehicle = await vehiclesRepository.findOne(id);

  return response.status(200).json(vehicle);
});

export default vehiclesRouter;
