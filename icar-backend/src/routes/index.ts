import { Router } from 'express';
import vehiclesRouter from './vehicles.routes';
import driversRouter from './driver.routes';
import vehicleUsageRouter from './usage.routes';

const routes = Router();

routes.use('/drivers', driversRouter);
routes.use('/vehicles', vehiclesRouter);
routes.use('/usages', vehicleUsageRouter);

export default routes;
