import VehicleUsage from '../models/VehicleUsage';
import VehiclesUsagesRepository from '../repositories/VehiclesUsagesRepository';
import AppError from '../errors/AppError';

interface RequestParameters {
  reason: string;
  driverId: string;
  vehicleId: string;
}

/* This service contains the main business logic of our api. */
class HireCarService {
  private vehiclesUsagesRepository: VehiclesUsagesRepository;

  constructor(vehiclesUsagesRepository: VehiclesUsagesRepository) {
    this.vehiclesUsagesRepository = vehiclesUsagesRepository;
  }

  public execute({
    reason,
    driverId,
    vehicleId,
  }: RequestParameters): VehicleUsage {
    const isVehicleAvaliable = this.vehiclesUsagesRepository.isVehicleAvaliable(
      vehicleId,
    );

    /* A driver can only have one car at a time. */
    if (!isVehicleAvaliable) {
      throw new AppError('This Vehicle is currently unavaliable.');
    }

    const isDriverAvaliable = this.vehiclesUsagesRepository.isDriverAvaliable(
      driverId,
    );

    /* A vehicle can only have one driver at a time. */
    if (!isDriverAvaliable) {
      throw new AppError(
        'This driver is an impostor. Call the police, he already took a car!',
      );
    }

    /* Here vehicle is borrowed. */
    const vehicleUsage = this.vehiclesUsagesRepository.hire({
      reason,
      driverId,
      vehicleId,
    });

    return vehicleUsage;
  }
}

export default HireCarService;
