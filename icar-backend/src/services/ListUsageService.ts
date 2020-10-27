import VehicleUsage from '../models/VehicleUsage';
import VehiclesUsagesRepository from '../repositories/VehiclesUsagesRepository';
import DriversRepository from '../repositories/DriversRepository';
import VehiclesRepository from '../repositories/VehiclesRepository';

class ListUsageService {
  private vehiclesRepository: VehiclesRepository;

  private vehiclesUsagesRepository: VehiclesUsagesRepository;

  private driversRepository: DriversRepository;

  constructor(
    vehiclesUsagesRepository: VehiclesUsagesRepository,
    vehiclesRepository: VehiclesRepository,
    driversRepository: DriversRepository,
  ) {
    this.driversRepository = driversRepository;
    this.vehiclesRepository = vehiclesRepository;
    this.vehiclesUsagesRepository = vehiclesUsagesRepository;
  }

  /* Due to the fact our main persistence array only has ids, this service was
     created to access and retrieve the other's entities data such as color, plate,
     brand and driver's name. */
  public execute(): VehicleUsage[] {
    const vehicleUsageList = this.vehiclesUsagesRepository.all();

    const ret = vehicleUsageList.map(item => {
      const driverName = this.driversRepository.findOne(item.driverId)?.name;
      const vehicle = this.vehiclesRepository.findOne(item.vehicleId);

      const vehicleColor = vehicle?.color;
      const vehiclePlate = vehicle?.plate;
      const vehicleBrand = vehicle?.brand;

      return {
        ...item,
        driverName,
        vehicleColor,
        vehiclePlate,
        vehicleBrand,
      };
    });

    return ret;
  }
}

export default ListUsageService;
