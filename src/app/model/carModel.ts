import { CarBrand } from './carBrand';
import { CarClass } from './carClass';

export class CarModel {
  id: number;
  name: string;
  carBrandDTO: CarBrand;
  carClassDTO: CarClass;

  constructor() {
  }
}
