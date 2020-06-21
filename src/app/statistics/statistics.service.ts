import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCars() {
    return this.httpClient.get<Car[]>('http://localhost:8086/car');
  }

  getKmageOfCar(id: string) {
    return this.httpClient.get<number>('http://localhost:8086/car/getKmage/' + id);
  }

}
