import Vehicle from '../models/Vehicle';

interface CreateVehicleDto {
  brand: string;
  color: string;
  plate: string;
}

interface UpdateVehicleDto {
  id: string;
  brand: string;
  color: string;
  plate: string;
}

class VehiclesRepository {
  private vehicles: Vehicle[];

  /* Just a mocked array to simulate a persistence and avoid unecessary
     complexity from a real database. */
  constructor() {
    this.vehicles = [
      {
        id: '289f03b6-e68d-410a-bd72-398c5fc8db83',
        brand: 'Aston Martin',
        color: 'Red',
        plate: 'CMD-100',
      },
      {
        id: '2c012170-fddc-4fc9-bd4b-de0d3f2a3993',
        brand: 'Alfa Romeo',
        color: 'Green',
        plate: 'CMD-200',
      },
      {
        id: '430cd34c-372c-4fac-832a-68c3071b4766',
        brand: 'Audi',
        color: 'Green',
        plate: 'CMD-300',
      },
      {
        id: '5d15dcae-996d-4403-87a3-610bc49c7a02',
        brand: 'Cadillac',
        color: 'Blue',
        plate: 'CMD-400',
      },
      {
        id: '3217394f-feb0-4aa2-9eef-ae2813dc0e76',
        brand: 'Chevrolet',
        color: 'Black',
        plate: 'CMD-500',
      },
    ];
  }

  /* Return a list os all vehicles. */
  public all(): Vehicle[] {
    return this.vehicles;
  }

  /* Adds a new vehicle to the database. */
  public create({ brand, color, plate }: CreateVehicleDto): Vehicle {
    const vehicle = new Vehicle({ brand, color, plate });
    this.vehicles.push(vehicle);
    return vehicle;
  }

  /* Remove a vehicle from the database. */
  public remove(id: string): void {
    const vehicleToBeRemoved = this.vehicles.findIndex(v => v.id === id);
    if (vehicleToBeRemoved > -1) {
      this.vehicles.splice(vehicleToBeRemoved, 1);
    }
  }

  /* Update a vehicle from the database. */
  public update({ id, brand, color, plate }: UpdateVehicleDto): void {
    const newVehicle = new Vehicle({ brand, color, plate });
    const vehicleToBeUpdated = this.vehicles.findIndex(v => v.id === id);
    if (vehicleToBeUpdated > -1) {
      this.vehicles[vehicleToBeUpdated] = newVehicle;
    }
  }

  /* Find the entrance of a vehicle by its id. */
  public findOne(id: string): Vehicle | null {
    const foundVehicle = this.vehicles.find(d => d.id === id);
    return foundVehicle || null;
  }

  /* Find a list of vehicles by their color. */
  public findByColor(color: string): Vehicle[] | null {
    const vehicles = this.vehicles.filter(c => c.color === color);
    return vehicles || null;
  }

  /* Find a list of vehicles by their brand. */
  public findByBrand(brand: string): Vehicle[] | null {
    const vehicles = this.vehicles.filter(c => c.brand === brand);
    return vehicles || null;
  }

  /* Find a list of vehicles by their brand and color. */
  public findByColorAndBrand(color: string, brand: string): Vehicle[] | null {
    const vehicles = this.vehicles.filter(
      c => c.brand === brand && c.color === color,
    );
    return vehicles || null;
  }
}

export default VehiclesRepository;
