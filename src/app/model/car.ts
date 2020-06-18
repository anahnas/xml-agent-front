import {CarClass} from './carClass';
import {CarModel} from './carModel';
import {CarBrand} from './carBrand';
import {FuelType} from './fuelType';
import {Transmission} from './transmission';
import {TransmissionType} from './transmissionType';

export class Car {
  id: string;
  carModelDTO: CarModel;
  fuelTypeDTO: FuelType;
  transmissionDTO: TransmissionType;
  kmage: number;
  availableChildSeats: number;
  limitKmsPerDay: number;
  pricePerDay: number;
  pricePerKm: number;
  carModel: CarModel;
  fuelType: FuelType;
  transmission: Transmission;
  waiver: boolean;
  limitedKms: boolean;
}

