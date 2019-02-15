import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Policy } from '../policy';
import { hostReportError } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})

export class PolicyService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  // Service used to get all acknowledged policies given a user ID
  getAllPolicies() {
    return this.http.get(this.config.getRccUrl() + '/policies/getAll/', this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to get all policies given a department ID
  getAllPoliciesForDept(departmentID: number) {
    return this.http.get(this.config.getRccUrl() + '/policies/getAllForDept/' + departmentID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to get all acknowledged policies given a user ID
  getAcknowledged(userID: number) {
    return this.http.get(this.config.getRccUrl() + '/policies/getAcknowledged/' + userID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to get all unacknowledged policies given a user ID
  getUnacknowledged(userID: number) {
    return this.http.get(this.config.getRccUrl() + '/policies/getUnacknowledged/' + userID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to acknowledge a policy given a user ID and policy ID
  acknowledgePolicy(policyID: number, userID: number) {
    const data = { policyId: policyID, eId: userID };
    return this.http.post(this.config.getRccUrl() + '/policies/acknowledge', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to create a new policy as an admin
  createPolicy(data: Object) {
    return this.http.post(this.config.getRccUrl() + '/policies/create', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to change the values of an existing policy as an admin
  updatePolicy(data: Object) {
    return this.http.post(this.config.getRccUrl() + '/policies/update', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to delete a policy as an admin
  deletePolicy(data: Object) {
    return this.http.post(this.config.getRccUrl() + '/policies/delete', data, this.config.getHttpOptions()).pipe(
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

