import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Car } from '../model/car';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {CarClass} from '../model/carClass';
import {TransmissionType} from '../model/transmissionType';
import {FuelType} from '../model/fuelType';
import {Rating} from '../model/rating';
import {Message} from "../model/message";

@Injectable()
export class MessageService {

  private _messagesUrl = 'http://localhost:8086/messages';

  constructor(private _http: HttpClient) { }

  getMessages(receiverId: string): Observable<Message[]> {
    return this._http.get<Message[]>(this._messagesUrl,
      {headers: {receiverId}}).pipe(
      catchError(this.handleError));
  }

  getMessage(id: string): Observable<Message> {
    return this._http.get<Message>(this._messagesUrl + '/' + id).pipe(catchError(this.handleError));
  }

  getMessageList(receiverId: string, sender: string): Observable<Message[]> {
    return this._http.get<Message[]>(this._messagesUrl + '/user/' + sender,
      {headers: {receiverId}}).pipe(
      catchError(this.handleError));
  }

  sendMessage(message: Message): Observable<any> {
    return this._http.post(this._messagesUrl, message).pipe(
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return throwError(err.message);
  }

}
