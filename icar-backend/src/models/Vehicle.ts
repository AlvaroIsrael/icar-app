import { uuid } from 'uuidv4';

class Vehicle {
  id: string;

  brand: string;

  color: string;

  plate: string;

  isAvaliable: boolean;

  constructor({ brand, color, plate }: Omit<Vehicle, 'id' | 'isAvaliable'>) {
    this.id = uuid();
    this.brand = brand;
    this.color = color;
    this.plate = plate;
    this.isAvaliable = true;
  }
}

export default Vehicle;
