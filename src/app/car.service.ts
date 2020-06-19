import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Car } from './model/car';
import {CarBrand} from './model/carBrand';
import {CarModel} from './model/carModel';
import {CarClass} from './model/carClass';
import {TransmissionType} from './model/transmissionType';
import {FuelType} from './model/fuelType';
import {Rating} from './model/rating';

@Injectable()
export class CarService {

    private _adUrl = 'http://localhost:8086/car';
  private _getCarBrandsUrl = 'http://localhost:8086/carBrand';
  private _getCarModelsUrl = 'http://localhost:8086/carModel';
  private _getCarClassesUrl = 'http://localhost:8086/carClass';
  private _getTransmissionUrl = 'http://localhost:8086/transmission';
  private _getFuelTypesUrl = 'http://localhost:8086/fuelType';

    constructor(private _http: HttpClient) { }

    getAds(): Observable<Car[]> {
        return this._http.get<Car[]>(this._adUrl).pipe(
                    catchError(this.handleError));
    }

    getCarBrands(): Observable<CarBrand[]> {
      return this._http.get<CarBrand[]>(this._getCarBrandsUrl).pipe(
        catchError(this.handleError));
    }

    getCarModels(): Observable<CarModel[]> {
      return this._http.get<CarModel[]>(this._getCarModelsUrl).pipe(
        catchError(this.handleError));
    }

    getCarClasses(): Observable<CarClass[]> {
      return this._http.get<CarClass[]>(this._getCarClassesUrl).pipe(
        catchError(this.handleError));
    }

    getTransmissionTypes(): Observable<TransmissionType[]> {
      return this._http.get<TransmissionType[]>(this._getTransmissionUrl).pipe(
        catchError(this.handleError));
    }

    getFuelTypes(): Observable<FuelType[]> {
      return this._http.get<FuelType[]>(this._getFuelTypesUrl).pipe(
        catchError(this.handleError));
    }

    getAd(carId: string): Observable<Car> {
        return this._http.get<Car>(this._adUrl + '/' + carId).pipe(
                    catchError(this.handleError));
    }

    updateCar(car: Car): Observable<Car> {
      return this._http.post<Car>(this._adUrl, car).pipe(
        catchError(this.handleError));
    }

    getImage(id: string): Observable<File> {
      // @ts-ignore
      return this._http.get<File>('http://localhost:8086/car/' + id + '/image', { responseType: 'blob' }).pipe(
        catchError(this.handleError));
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return throwError(err.message);
    }

}
