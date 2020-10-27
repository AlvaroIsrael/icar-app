import Vehicle from '../models/Vehicle';
import VehiclesRepository from '../repositories/VehiclesRepository';

interface RequestParameters {
  color: string | undefined;
  brand: string | undefined;
}

class ListCarService {
  private vehiclesRepository: VehiclesRepository;

  constructor(vehiclesRepository: VehiclesRepository) {
    this.vehiclesRepository = vehiclesRepository;
  }

  public execute({ color, brand }: RequestParameters): Vehicle[] | null {
    let vehicles;

    if (color && brand) {
      vehicles = this.vehiclesRepository.findByColorAndBrand(color, brand);
    } else if (color) {
      vehicles = this.vehiclesRepository.findByColor(color);
    } else if (brand) {
      vehicles = this.vehiclesRepository.findByColor(brand);
    } else {
      vehicles = this.vehiclesRepository.all();
    }

    return vehicles;
  }
}

export default ListCarService;
