import { uuid } from 'uuidv4';

class Driver {
  id: string;

  name: string;

  isAvaliable: boolean;

  constructor({ name }: Omit<Driver, 'id' | 'isAvaliable'>) {
    this.id = uuid();
    this.name = name;
    this.isAvaliable = true;
  }
}

export default Driver;
