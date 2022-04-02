import VehicleUsage from '../models/VehicleUsage';

interface HireVehicleDto {
  reason: string;
  driverId: string;
  vehicleId: string;
}

interface ReturnVehicleDto {
  id: string;
}

class VehiclesUsagesRepository {
  private vehiclesUsages: VehicleUsage[];

  constructor() {
    this.vehiclesUsages = [];
  }

  /* Return a list os all vehicles usages. */
  public async all(): Promise<VehicleUsage[]> {
    return this.vehiclesUsages;
  }

  /* Find the entrance of a borrowed vehicle by its id. */
  public async findOne(id: string): Promise<VehicleUsage | null> {
    const foundUsage = this.vehiclesUsages.find(v => v.id === id);
    return foundUsage || null;
  }

  /* This function has the purpose to ensure that a driver is not driving any car.
   In order to accomlish this I loop through the VehicleUsage array wich represents
   a list of already borrowed vehicles and verify if none of the entrances have a null endDate.
   If any entrance has an endDate equal to null this means that entrance correspond to
   a vehicle witch is already taken and therefore cannot be taken before being released. */
  public async isDriverAvaliable(id: string): Promise<boolean> {
    let isAvaliable = true;
    const driverList = this.vehiclesUsages.filter(d => d.driverId === id);

    driverList.every(driver => {
      if (driver.endDate === null) {
        isAvaliable = false;
        return false;
      }
      return true;
    });

    return isAvaliable;
  }

  /* This function follows the same purpose and logic described above, but is related
   to the avaliability of the vehicle and not the Driver. */
  public async isVehicleAvaliable(id: string): Promise<boolean> {
    let isAvaliable = true;
    const vehiclesList = this.vehiclesUsages.filter(v => v.vehicleId === id);

    vehiclesList.every(vehicle => {
      if (vehicle.endDate === null) {
        isAvaliable = false;
        return false;
      }
      return true;
    });

    return isAvaliable;
  }

  /* Registers the hiring of a Vehicle. */
  public async hire({ reason, driverId, vehicleId }: HireVehicleDto): Promise<VehicleUsage> {
    const usage = new VehicleUsage({
      startDate: new Date(),
      endDate: null,
      reason,
      driverId,
      vehicleId,
    });
    this.vehiclesUsages.push(usage);
    return usage;
  }

  /* Registers the returning of a previouslly borrowed Vehicle. */
  public async return({ id }: ReturnVehicleDto): Promise<void> {
    const usageToBeUpdated = this.vehiclesUsages.findIndex(u => u.id === id);
    if (usageToBeUpdated > -1) {
      this.vehiclesUsages[usageToBeUpdated].endDate = new Date();
    }
  }
}

export default VehiclesUsagesRepository;
