import { CarBrand } from './carBrand';
import { CarModel } from './carModel';
import { FuelType } from './fuelType';
import { TransmissionType } from './transmissionType';

export class Car{
    id: String;
    carModelDTO: CarModel;
    fuelTypeDTO: FuelType;
    transmissionDTO: TransmissionType;
}