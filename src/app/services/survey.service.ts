import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Survey } from '../survey';
import { hostReportError } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  // Service used to get all acknowledged surveys given a user ID
  getAllSurveys() {
    return this.http.get(this.config.getRccUrl() + '/surveys/getAll/', this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to get all surveys for a given department ID
  getAllSurveysForDept(surveyID: number) {
    return this.http.get(this.config.getRccUrl() + '/surveys/getAllForDept/' + surveyID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to get all acknowledged surveys given a user ID
  getAcknowledged(userID: number) {
    return this.http.get(this.config.getRccUrl() + '/surveys/getAcknowledged/' + userID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to get all unacknowledged surveys given a user ID
  getUnacknowledged(userID: number) {
    return this.http.get(this.config.getRccUrl() + '/surveys/getUnacknowledged/' + userID, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to acknowledge a survey given a user ID and survey ID
  acknowledgeSurvey(surveyID: number, userID: number) {
    const data = { surveyId: surveyID, eId: userID };
    return this.http.post(this.config.getRccUrl() + '/surveys/acknowledge', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to create a new survey as an admin
  createSurvey(data: Object) {
    return this.http.post(this.config.getRccUrl() + '/surveys/create', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to change the values of an existing survey as an admin
  updateSurvey(data: Object) {
    return this.http.post(this.config.getRccUrl() + '/surveys/update', data, this.config.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  // Service used to delete a survey as an admin
  deleteSurvey(data: Object) {
    return this.http.post(this.config.getRccUrl() + '/surveys/delete', data, this.config.getHttpOptions()).pipe(
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

