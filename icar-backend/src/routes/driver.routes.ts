import { Router } from 'express';
import DriversRepository from '../repositories/DriversRepository';
import ListDriverService from '../services/ListDriverService';

const driversRouter = Router();
const driversRepository = new DriversRepository();

driversRouter.post('/', (request, response) => {
  const { name } = request.body;

  const driver = driversRepository.create({ name });

  return response.status(200).json(driver);
});

driversRouter.put('/', (request, response) => {
  const { id, name, isAvaliable } = request.body;

  driversRepository.update({ id, name, isAvaliable });

  return response.status(204).json();
});

driversRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  driversRepository.remove(id);

  return response.status(204).json();
});

driversRouter.get('/', (request, response) => {
  const name = request.query.name as string;

  const listDrivers = new ListDriverService(driversRepository);

  const drivers = listDrivers.execute({ name });

  return response.status(200).json(drivers);
});

driversRouter.get('/:id', (request, response) => {
  const { id } = request.params;

  const driver = driversRepository.findOne(id);

  return response.status(200).json(driver);
});

export default driversRouter;
