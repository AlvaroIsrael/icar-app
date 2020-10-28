import Driver from '../models/Driver';
import DriversRepository from '../repositories/DriversRepository';

interface RequestParameters {
  name: string | undefined;
}

class ListDriverService {
  private driversRepository: DriversRepository;

  constructor(driversRepository: DriversRepository) {
    this.driversRepository = driversRepository;
  }

  /* This method was created just to simplify the process of filtering results
     based at query params by name or full results if no params at all. */
  public async execute({ name }: RequestParameters): Promise<Driver[] | null> {
    let drivers;

    if (name) {
      drivers = this.driversRepository.findByName(name);
    } else {
      drivers = this.driversRepository.all();
    }

    return drivers;
  }
}

export default ListDriverService;
