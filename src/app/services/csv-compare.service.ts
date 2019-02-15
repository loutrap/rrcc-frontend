import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { hostReportError } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})

export class CsvCompareService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  // Service used to get the employees from the imported CSV file
  getEmployees() {
    return this.http.get(this.config.getRccUrl() + '/users/csvCompare/', this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // handles error messages returned from the backend
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
  }
}
