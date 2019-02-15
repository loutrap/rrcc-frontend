import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Message } from '../message';

@Injectable({
  providedIn: 'root'
})

export class AlertsService {

  // constructor
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }


  /**
   * sendAlert will make a post request to the backend and utilize the Twilio service
   * to send SMS messages to the selected recipients
   * @param message - a message object containing the a message string and an array of departments
   */
  sendAlert(message: Message) {
    return this.http.post(this.config.getRccUrl() + '/alerts/sms', message, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Helper function to handle errors from http requests
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error.error);
  };
}

