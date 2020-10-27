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

  public all(): VehicleUsage[] {
    return this.vehiclesUsages;
  }

  public findOne(id: string): VehicleUsage | null {
    const foundUsage = this.vehiclesUsages.find(v => v.id === id);
    return foundUsage || null;
  }

  public hire({ reason, driverId, vehicleId }: HireVehicleDto): VehicleUsage {
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

  public return({ id }: ReturnVehicleDto): void {
    const usageToBeUpdated = this.vehiclesUsages.findIndex(u => u.id === id);
    if (usageToBeUpdated > -1) {
      this.vehiclesUsages[usageToBeUpdated].endDate = new Date();
    }
  }
}

export default VehiclesUsagesRepository;
