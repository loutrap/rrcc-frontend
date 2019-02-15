import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { UpdatedEmployee } from '../updatedEmployee';


@Injectable({
  providedIn: 'root'
})
export class UpdateUserInfoService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  /**
   * updateUser will make a post request to the backend and update the record of the user with
   * the new information
   * @param updatedUser - an obj that containes the edited users information to update
   */
  updateUser(updatedUser: UpdatedEmployee) {
    return this.http.post(this.config.getRccUrl() + '/users/editUser', updatedUser ,this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Helper function to handle errors from http requests
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // error handling
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // error handling
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error.error);
  }
}
