import Driver from '../models/Driver';

interface CreateDriverDto {
  name: string;
}

interface UpdateDriverDto {
  id: string;
  name: string;
  isAvaliable: boolean;
}

class DriversRepository {
  private drivers: Driver[];

  constructor() {
    this.drivers = [
      {
        id: '4dd67905-4c33-49be-b08c-0cdff8bfb842',
        name: 'Sara Mills',
        isAvaliable: true,
      },
      {
        id: '6d3f724c-b811-4062-8da9-824a4f6cf7c3',
        name: 'Frank Elliott',
        isAvaliable: true,
      },
      {
        id: 'e4869f55-7a70-4b40-8dbd-21a99759ce91',
        name: 'Faye Walsh',
        isAvaliable: true,
      },
      {
        id: '634275a5-bb76-4a0c-ad5c-c810afdaa882',
        name: 'Ellie Simmons',
        isAvaliable: true,
      },
      {
        id: 'd473cf83-9445-4f32-b14b-4195af645138',
        name: 'Joshua Harris',
        isAvaliable: true,
      },
    ];
  }

  public all(): Driver[] {
    return this.drivers;
  }

  public create({ name }: CreateDriverDto): Driver {
    const car = new Driver({ name });
    this.drivers.push(car);
    return car;
  }

  public update({ id, name }: UpdateDriverDto): void {
    const newDriver = new Driver({ name });
    const driverToBeUpdated = this.drivers.findIndex(d => d.id === id);
    if (driverToBeUpdated > -1) {
      this.drivers[driverToBeUpdated] = newDriver;
    }
  }

  public driverStatusToggle(id: string): void {
    const driverToBeUpdated = this.drivers.findIndex(v => v.id === id);
    if (driverToBeUpdated > -1) {
      this.drivers[driverToBeUpdated].isAvaliable = !this.drivers[
        driverToBeUpdated
      ].isAvaliable;
    }
  }

  public remove(id: string): void {
    const vdriverToBeRemoved = this.drivers.findIndex(d => d.id === id);
    if (vdriverToBeRemoved > -1) {
      this.drivers.splice(vdriverToBeRemoved, 1);
    }
  }

  public findOne(id: string): Driver | null {
    const foundDriver = this.drivers.find(d => d.id === id);
    return foundDriver || null;
  }

  public findByName(name: string): Driver[] | null {
    const cars = this.drivers.filter(c => c.name === name);
    return cars || null;
  }

  public isAvaliable(id: string): boolean {
    const avaliableDriver = this.drivers.find(d => d.id === id);
    const isAvaliable = !!avaliableDriver?.isAvaliable;
    return isAvaliable;
  }
}

export default DriversRepository;
