import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {Car} from '../model/car';
import {CarClass} from '../model/carClass';

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
}
