import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  /**
   * Checks if the user is already logged in on this session.
   */
  loggedIn() {
    return this.http.get(this.config.getRccUrl() + '/auth/loggedIn', this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Passes the login credentials to the backend for authentication.
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    return this.http.post(this.config.getRccUrl() + '/auth/login', {email: email, password: password}, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Calls passport's logout function
   */
  logout() {
    return this.http.get(this.config.getRccUrl() + '/auth/logout', this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Helper function to handle errors from http requests
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      /*console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);*/
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error.error);
  }
}
