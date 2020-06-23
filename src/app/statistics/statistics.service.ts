import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../model/car';
import {map} from 'rxjs/operators';

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
    return this.httpClient.get('http://localhost:8086/car/km/' + id).pipe(
      map(kmageStat => {
        console.log(kmageStat);
        return kmageStat;
      })
    );
  }

  getRating(id: string) {
    return this.httpClient.get('http://localhost:8086/car/rating/' + id).pipe(
      map(ratingStat => {
        console.log(ratingStat);
        return ratingStat;
      })
    );
  }

}
