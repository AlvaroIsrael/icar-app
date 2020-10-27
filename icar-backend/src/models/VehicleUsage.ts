import { uuid } from 'uuidv4';

class VehicleUsage {
  id: string;

  startDate: Date;

  endDate: Date | null;

  reason: string;

  driverId: string;

  vehicleId: string;

  constructor({
    startDate,
    reason,
    driverId,
    vehicleId,
  }: Omit<VehicleUsage, 'id'>) {
    this.id = uuid();
    this.startDate = startDate;
    this.endDate = null;
    this.reason = reason;
    this.driverId = driverId;
    this.vehicleId = vehicleId;
  }
}

export default VehicleUsage;
