import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Rating } from '../model/rating';

@Injectable()
export class RatingService {

  private _ratingUrl = 'http://localhost:8086/rating';

    constructor(private _http: HttpClient) { }

    getRatings(carId: string): Observable<Rating[]> {
        return this._http.get<Rating[]>(this._ratingUrl,
            {headers: {carId}}).pipe(
                    catchError(this.handleError));
    }

  postRating(carId: string, rating: Rating): Observable<Rating[]> {
    return this._http.post<Rating[]>(this._ratingUrl, rating,
      {headers: {carId}}).pipe(
      catchError(this.handleError));
  }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return throwError(err.message);
    }
}
