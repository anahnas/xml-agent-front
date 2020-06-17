import {CarClass} from './carClass';
import {CarModel} from './carModel';
import {CarBrand} from './carBrand';
import {FuelType} from './fuelType';
import {Transmission} from './transmission';
import {TransmissionType} from './transmissionType';

export class Car {

  // id: number;
  id: string;
  kmage: number;
  availableChildSeats: number;
  limitKmsPerDay: number;
  pricePerDay: number;
  pricePerKm: number;
  carClass: CarClass;
  carModel: CarModel;
  carBrand: CarBrand;
  fuelType: FuelType;
  transmission: Transmission;
  waiver: boolean;
  limitedKms: boolean;
  carModelDTO: CarModel;
  fuelTypeDTO: FuelType;
  transmissionDTO: TransmissionType;



  constructor() {
  }

}

