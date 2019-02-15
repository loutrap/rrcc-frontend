import { Injectable } from '@angular/core';
import { Registrant } from '../registrant';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { Department } from '../department';
import {ManageUserSettings} from '../manageUserSettings';
import { UpdatedEmployee } from '../updatedEmployee';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userType: number = null;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  /**
   * Registers the user in our system.
   * @param registrant - registration information
   */
  register(registrant: Registrant) {
    return this.http.post(this.config.getRccUrl() + '/users/register', registrant, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service that returns all users in the database
  getUsers() {
    return this.http.get(this.config.getRccUrl() + '/users/getUsers', this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service the returns all phone numbers from a given list of departments
  // need to pass array of departments with GET for query
  getPhoneNumbersByDepartments(departments: Department[]) {
    return this.http.post(this.config.getRccUrl() + '/users/getPhoneNumbersByDepts', departments, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // returns all information about a user given their ID
  getUserByUserID(userID: number) {
    return this.http.get(this.config.getRccUrl() + '/users/getUser/' + userID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service that updates a user's type given a user ID
  updateManagedUserType(user: ManageUserSettings) {
    const data = {
      eId: user.userID,
      usertypeId: user.userType
    };
    return this.http.post(this.config.getRccUrl() + '/users/setUserType', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service that updates a user's department given a department ID
  updateManagedUserDepartment(user: ManageUserSettings) {
    const data = {
      eId: user.userID,
      deptId: user.department
    };
    return this.http.post(this.config.getRccUrl() + '/users/setDepartment', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Helper function for login to set the user type
  setUser(user: any) {
    this.userType = user.usertype.id;
  }

  // Sets a user to active or inactive based on the given active status
  // Calls the appropriate endpoint to set them either to 'active' or 'inactive'
  updateManagedUserStatus(user: ManageUserSettings) {
    const data = {
      eId: user.userID
    };
    if (user.active === true) {
      return this.http.post(this.config.getRccUrl() + '/users/setActive', data, this.config.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
    } else if (user.active === false) {
      return this.http.post(this.config.getRccUrl() + '/users/setInactive', data, this.config.getHttpOptions()).pipe(
        catchError(this.handleError)
      );
    } else {
      // error handling
    }
  }

  // Service used to get all unacknowledged policies given a policy id
  getUnackedByPolicyID(policyID: number) {
    return this.http.get(this.config.getRccUrl() + '/policies/getUnackEmployees/' + policyID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to get all unacknowledged surveys given a policy id
  getUnackedBySurveyID(surveyID: number) {
    return this.http.get(this.config.getRccUrl() + '/surveys/getUnackEmployees/' + surveyID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service that updates a user given a user object
  updateUser(updatedUser) {
    return this.http.post(this.config.getRccUrl() + '/users/editUser', updatedUser ,this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service that updates a user's password given a password string
  updatePassword(updatedPass) {
    return this.http.post(this.config.getRccUrl() + '/users/resetPassword', updatedPass ,this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service that sends a forgot password link to a given user's email
  forgotPassword(emailAddress) {
    return this.http.post(this.config.getRccUrl() + '/users/resetPassword', emailAddress ,this.config.getHttpOptions()).pipe(
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
