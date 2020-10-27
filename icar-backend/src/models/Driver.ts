import { uuid } from 'uuidv4';

/* Just an Entity representing a vehicle's driver. */
class Driver {
  id: string;

  name: string;

  constructor({ name }: Omit<Driver, 'id'>) {
    this.id = uuid();
    this.name = name;
  }
}

export default Driver;
