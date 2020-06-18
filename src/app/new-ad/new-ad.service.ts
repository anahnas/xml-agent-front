import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {Car} from '../model/car';
import {CarClass} from '../model/carClass';
import {FuelType} from '../model/fuelType';
import {Transmission} from '../model/transmission';
import {Advertisement} from '../model/advertisement';

@Injectable({
  providedIn: 'root'
})
export class NewAdService {
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getCarBrands() {
    return this.httpClient.get<CarBrand[]>('http://localhost:8086/carBrand');
  }
  getCarModels() {
    return this.httpClient.get<CarModel[]>('http://localhost:8086/carModel');
  }
  getCarClass() {
    return this.httpClient.get<CarClass[]>('http://localhost:8086/carClass');
  }

  getFuelType() {
    return this.httpClient.get<FuelType[]>('http://localhost:8086/fuelType');
  }
  getTransmission() {
    return this.httpClient.get<Transmission[]>('http://localhost:8086/transmission');
  }

  createAdvertisement(advertisement: Advertisement) {

    return this.httpClient.post('http://localhost:8086/advertisement', advertisement);

  }

}
