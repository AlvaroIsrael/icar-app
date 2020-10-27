import { Router } from 'express';
import DriversRepository from '../repositories/DriversRepository';
import ListDriverService from '../services/ListDriverService';

const driversRouter = Router();
const driversRepository = new DriversRepository();

/* Creates a new driver. */
driversRouter.post('/', (request, response) => {
  const { name } = request.body;

  const driver = driversRepository.create({ name });

  return response.status(200).json(driver);
});

/* Updates a driver. */
driversRouter.put('/', (request, response) => {
  const { id, name, isAvaliable } = request.body;

  driversRepository.update({ id, name, isAvaliable });

  return response.status(204).json();
});

/* Removes a driver. */
driversRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  driversRepository.remove(id);

  return response.status(204).json();
});

/* Finds and return a driver filtering by it's name.
   If no filter is provided then all the drivers are returned. */
driversRouter.get('/', (request, response) => {
  const name = request.query.name as string;

  const listDrivers = new ListDriverService(driversRepository);

  const drivers = listDrivers.execute({ name });

  return response.status(200).json(drivers);
});

/* Finds and return a driver by it's id. */
driversRouter.get('/:id', (request, response) => {
  const { id } = request.params;

  const driver = driversRepository.findOne(id);

  return response.status(200).json(driver);
});

export default driversRouter;
