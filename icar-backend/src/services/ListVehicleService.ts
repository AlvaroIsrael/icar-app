import Vehicle from '../models/Vehicle';
import VehiclesRepository from '../repositories/VehiclesRepository';

interface RequestParameters {
  color: string | undefined;
  brand: string | undefined;
}

class ListVehicleService {
  private vehiclesRepository: VehiclesRepository;

  constructor(vehiclesRepository: VehiclesRepository) {
    this.vehiclesRepository = vehiclesRepository;
  }

  /* This method was created just to simplify the process of filtering results
     based at query params by color and brand or full results if no params at all. */
  public async execute({
    color,
    brand,
  }: RequestParameters): Promise<Vehicle[] | null> {
    let vehicles: Vehicle[] | null;

    if (color && brand) {
      vehicles = await this.vehiclesRepository.findByColorAndBrand(
        color,
        brand,
      );
    } else if (color) {
      vehicles = await this.vehiclesRepository.findByColor(color);
    } else if (brand) {
      vehicles = await this.vehiclesRepository.findByBrand(brand);
    } else {
      vehicles = await this.vehiclesRepository.all();
    }

    return vehicles;
  }
}

export default ListVehicleService;
