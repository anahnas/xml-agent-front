import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Car } from './model/car';

@Injectable()
export class CarService{

    private _getAdUrl = 'http://localhost:8086/car';

    constructor(private _http: HttpClient){ }
   
    getAds() : Observable<Car[]>{
        return this._http.get<Car[]>(this._getAdUrl).pipe(
                    catchError(this.handleError));
    }

    getAd(carId : string) : Observable<Car>{
        return this._http.get<Car>(this._getAdUrl + "/" + carId).pipe(
                    catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse){
        console.log(err.message);
        return throwError(err.message);
    }
}