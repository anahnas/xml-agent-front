import { CarClass } from './carClass'
import { CarBrand } from './carBrand';

export class CarModel {
  id:String;
  name:String;
  carBrandDTO:CarBrand; 
  carClassDTO:CarClass;
}
