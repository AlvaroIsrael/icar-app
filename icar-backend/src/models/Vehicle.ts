import { uuid } from 'uuidv4';

/* Just an Entity representing a vehicle. */
class Vehicle {
  id: string;

  brand: string;

  color: string;

  plate: string;

  constructor({ brand, color, plate }: Omit<Vehicle, 'id'>) {
    this.id = uuid();
    this.brand = brand;
    this.color = color;
    this.plate = plate;
  }
}

export default Vehicle;
