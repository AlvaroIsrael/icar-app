import VehicleUsage from '../models/VehicleUsage';
import VehiclesRepository from '../repositories/VehiclesRepository';
import VehiclesUsagesRepository from '../repositories/VehiclesUsagesRepository';
import DriversRepository from '../repositories/DriversRepository';
import AppError from '../errors/AppError';

/*
Regras de negócio:
[/] Um automóvel só pode ser utilizado por um motorista por vez.
[/] Um motorista que já esteja utilizando um automóvel não pode utilizar outro automóvel
   ao mesmo tempo.
*/

interface RequestParameters {
  reason: string;
  driverId: string;
  vehicleId: string;
}

class HireCarService {
  private vehiclesRepository: VehiclesRepository;

  private vehiclesUsagesRepository: VehiclesUsagesRepository;

  private driversRepository: DriversRepository;

  constructor(
    vehiclesRepository: VehiclesRepository,
    vehiclesUsagesRepository: VehiclesUsagesRepository,
    driversRepository: DriversRepository,
  ) {
    this.vehiclesRepository = vehiclesRepository;
    this.vehiclesUsagesRepository = vehiclesUsagesRepository;
    this.driversRepository = driversRepository;
  }

  public execute({
    reason,
    driverId,
    vehicleId,
  }: RequestParameters): VehicleUsage {
    const isVehicleAvaliable = this.vehiclesRepository.isAvaliable(vehicleId);

    if (isVehicleAvaliable) {
      this.vehiclesRepository.vehicleStatusToggle(vehicleId);
      console.log(this.vehiclesRepository.all());
    } else {
      throw new AppError('This Vehicle is currently unavaliable.');
    }

    const isDriverAvaliable = this.driversRepository.isAvaliable(driverId);

    if (isDriverAvaliable) {
      this.driversRepository.driverStatusToggle(driverId);
    } else {
      throw new AppError(
        'This driver is an impostor. Call the police, he already took a car!',
      );
    }

    const vehicleUsage = this.vehiclesUsagesRepository.hire({
      reason,
      driverId,
      vehicleId,
    });

    console.log(this.vehiclesRepository.all());

    return vehicleUsage;
  }
}

export default HireCarService;
