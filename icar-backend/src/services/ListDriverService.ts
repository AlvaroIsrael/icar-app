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

  public execute({ name }: RequestParameters): Driver[] | null {
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
