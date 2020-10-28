import { v4 } from 'uuid';

/* Just an Entity representing a vehicle's driver. */
class Driver {
  id: string;

  name: string;

  constructor({ name }: Omit<Driver, 'id'>) {
    this.id = v4();
    this.name = name;
  }
}

export default Driver;
