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
  private readonly drivers: Driver[];

  /* Just a mocked array to simulate a persistence and avoid unecessary
   complexity from a real database. */
  constructor() {
    this.drivers = [
      {
        id: '4dd67905-4c33-49be-b08c-0cdff8bfb842',
        name: 'Sara Mills',
      },
      {
        id: '6d3f724c-b811-4062-8da9-824a4f6cf7c3',
        name: 'Frank Elliott',
      },
      {
        id: 'e4869f55-7a70-4b40-8dbd-21a99759ce91',
        name: 'Faye Walsh',
      },
      {
        id: '634275a5-bb76-4a0c-ad5c-c810afdaa882',
        name: 'Ellie Simmons',
      },
      {
        id: 'd473cf83-9445-4f32-b14b-4195af645138',
        name: 'Joshua Harris',
      },
    ];
  }

  /* Return a list os all drivers. */
  public async all(): Promise<Driver[]> {
    return this.drivers;
  }

  /* Adds a new driver to the database. */
  public async create({ name }: CreateDriverDto): Promise<Driver> {
    const car = new Driver({ name });
    this.drivers.push(car);
    return car;
  }

  /* Update a driver from the database. */
  public async update({ id, name }: UpdateDriverDto): Promise<void> {
    const newDriver = new Driver({ name });
    const driverToBeUpdated = this.drivers.findIndex(d => d.id === id);
    if (driverToBeUpdated > -1) {
      this.drivers[driverToBeUpdated] = newDriver;
    }
  }

  /* Remove a driver from the database. */
  public async remove(id: string): Promise<void> {
    const vdriverToBeRemoved = this.drivers.findIndex(d => d.id === id);
    if (vdriverToBeRemoved > -1) {
      this.drivers.splice(vdriverToBeRemoved, 1);
    }
  }

  /* Find the entrance of a driver by its id. */
  public async findOne(id: string): Promise<Driver | null> {
    const foundDriver = this.drivers.find(d => d.id === id);
    return foundDriver || null;
  }

  /* Find the entrance of a driver by its name. */
  public async findByName(name: string): Promise<Driver[] | null> {
    const cars = this.drivers.filter(c => c.name === name);
    return cars || null;
  }
}

export default DriversRepository;
