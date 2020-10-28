import { Router } from 'express';
import DriversRepository from '../repositories/DriversRepository';
import ListDriverService from '../services/ListDriverService';

const driversRouter = Router();
const driversRepository = new DriversRepository();

/* Creates a new driver. */
driversRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const driver = await driversRepository.create({ name });

  return response.status(200).json(driver);
});

/* Updates a driver. */
driversRouter.put('/', async (request, response) => {
  const { id, name, isAvaliable } = request.body;

  await driversRepository.update({ id, name, isAvaliable });

  return response.status(204).json();
});

/* Removes a driver. */
driversRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await driversRepository.remove(id);

  return response.status(204).json();
});

/* Finds and return a driver filtering by it's name.
   If no filter is provided then all the drivers are returned. */
driversRouter.get('/', async (request, response) => {
  const name = request.query.name as string;

  const listDrivers = new ListDriverService(driversRepository);

  const drivers = await listDrivers.execute({ name });

  return response.status(200).json(drivers);
});

/* Finds and return a driver by it's id. */
driversRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const driver = await driversRepository.findOne(id);

  return response.status(200).json(driver);
});

export default driversRouter;
