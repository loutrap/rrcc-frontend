import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';
import { SurveyService } from '../services/survey.service';
import { UsersService } from '../services/users.service';
import { Survey } from '../survey';
import { Globals } from '../globals';
import { MatDialog, MatDialogConfig, MatDialogRef, MatExpansionPanel } from '@angular/material';
import { SurveyDialogComponent } from '../survey-dialog/survey-dialog.component';
import {Employee} from '../employee';
import {AckListDialogComponent} from '../ack-list-dialog/ack-list-dialog.component';

@Component({
  selector: 'rcc-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  // Class variables
  userID: number = null;
  dialogRef: MatDialogRef<SurveyDialogComponent>;
  newSurvey: Survey = this.globals.EMPTY_SURVEY;
  editSurvey: Survey = this.globals.EMPTY_SURVEY;
  ackSurveys = Array<Survey>();
  unackSurveys = Array<Survey>();
  allSurveys = Array<Survey>(); // used for admin purposes
  userType: number = null;
  userDeptId: number = null;

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  constructor( private alertsService: AlertsService, private authService: AuthService, private usersService: UsersService,
               private router: Router, private dialog: MatDialog, private globals: Globals,
               private surveyService: SurveyService) { }

  ngOnInit() {
    // authenticate the user
    this.authService.loggedIn().subscribe(result => {
      // Set userID to what was given from authService
      this.userID = result['eId'];
      this.userType = result['usertype']['id'];
    }, error => {
      this.router.navigate(['login']);
    }, () => {
      // After userID is found, initialize the ack and unack survey arrays
      this.updateSurveyArrays();
    });
  }

  // Calls for all surveys relevant to that user whenever a change in surveys occurs
  // HTML values are updated automatically when this function is called
  updateSurveyArrays() {
    this.ackSurveys = Array<Survey>();
    this.unackSurveys = Array<Survey>();
    this.allSurveys = Array<Survey>();

    // If the user is an admin, get all of the surveys
    if (this.userType === this.SUPERUSER || this.userType === this.ADMIN) {
      this.surveyService.getAllSurveys().subscribe(result => {
        for (const survey of result as Array<Object>) {
          const depts = [];
          if (survey['deptSales']) { depts.push({'id': 1}); }
          if (survey['deptGarage']) { depts.push({'id': 2}); }
          if (survey['deptAdmin']) { depts.push({'id': 3}); }
          if (survey['deptFoodBeverage']) { depts.push({'id': 4}); }
          if (survey['deptProduction']) { depts.push({'id': 5}); }

          const p = {
            'id': survey['surveyID'],
            'title': survey['title'],
            'description': survey['description'],
            'departments': depts,
            'url': survey['url'],
            'acknowledged': false,
            'date': survey['date'].substr(0, 10),
            'numHaveAcked': survey['acks'],
            'numHaveSurvey': survey['total']
          } as Survey;
          this.allSurveys.push(p);
        }
      }, error => {
        // error handling
      });
    } else if (this.userType === this.DPTHEAD) {
      this.surveyService.getAllSurveysForDept(this.userDeptId).subscribe(result => {
        for (const survey of result as Array<Object>) {
          const depts = [];
          if (survey['deptSales']) { depts.push({'id': 1}); }
          if (survey['deptGarage']) { depts.push({'id': 2}); }
          if (survey['deptAdmin']) { depts.push({'id': 3}); }
          if (survey['deptFoodBeverage']) { depts.push({'id': 4}); }
          if (survey['deptProduction']) { depts.push({'id': 5}); }

          const p = {
            'id': survey['surveyID'],
            'title': survey['title'],
            'description': survey['description'],
            'departments': depts,
            'url': survey['url'],
            'acknowledged': false,
            'date': survey['date'].substr(0, 10)
          } as Survey;
          this.allSurveys.push(p);
        }
      }, error => {
        // error handling
      });
    }

    // Get all of the unacknowledged surveys
    this.surveyService.getUnacknowledged(this.userID).subscribe(result => {
      for (const survey of result as Array<Object>) {
        const depts = [];
        if (survey['deptSales']) { depts.push({'id': 1}); }
        if (survey['deptGarage']) { depts.push({'id': 2}); }
        if (survey['deptAdmin']) { depts.push({'id': 3}); }
        if (survey['deptFoodBeverage']) { depts.push({'id': 4}); }
        if (survey['deptProduction']) { depts.push({'id': 5}); }

        const p = {
          'id': survey['surveyID'],
          'title': survey['title'],
          'description': survey['description'],
          'departments': depts,
          'url': survey['url'],
          'acknowledged': false,
          'date': survey['date'].substr(0, 10)
        } as Survey;
        this.unackSurveys.push(p);
      }
    }, error => {
      // error handling
    });

    // Get all of the acknowledged surveys
    this.surveyService.getAcknowledged(this.userID).subscribe(result => {
      for (const survey of result as Array<Object>) {
        const depts = [];
        if (survey['deptSales']) { depts.push({'id': 1}); }
        if (survey['deptGarage']) { depts.push({'id': 2}); }
        if (survey['deptAdmin']) { depts.push({'id': 3}); }
        if (survey['deptFoodBeverage']) { depts.push({'id': 4}); }
        if (survey['deptProduction']) { depts.push({'id': 5}); }

        const p = {
          'id': survey['surveyID'],
          'title': survey['title'],
          'description': survey['description'],
          'departments': depts,
          'url': survey['url'],
          'acknowledged': true,
          'date': survey['date'].substr(0, 10)
        } as Survey;
        this.ackSurveys.push(p);
      }
    }, error => {
      // error handling
    });
  }

  // Acknowledge a survey using the survey ID and user ID
  acknowledgeSurvey(surveyID: number, userID: number) {
    this.surveyService.acknowledgeSurvey(surveyID, userID).subscribe(
      result => { this.updateSurveyArrays(); }, error => { });
  }

  // Delete a survey, using the survey ID
  deleteSurvey(survey: Survey) {
    // Can only delete if you are an admin
    if (this.userType === this.SUPERUSER || this.userType === this.ADMIN || this.userType === this.DPTHEAD) {
      this.surveyService.deleteSurvey({surveyId: survey.id}).subscribe(
        result => {
          this.updateSurveyArrays();
        }, error => {
          // error handling
        });
    }
  }

  // opens the edit dialog box for creating a survey
  openCreateSurveyDialog() {
    // Open dialog and keep a reference to it
    this.dialogRef = this.dialog.open(SurveyDialogComponent, {
      data: {
        title: this.newSurvey.title,
        description: this.newSurvey.description,
        url: this.newSurvey.url,
        departments: this.newSurvey.departments
      }
    });

    // After the dialog is close, handle the data from the forms
    this.dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.surveyService.createSurvey(data).subscribe(result => {
          // update surveys array to show the changes
          this.updateSurveyArrays(); }, error => {
          // error handling
        });
      } else {
        // error handling
      }
    });
  }

  // Opens Edit Survey Dialog
  openEditSurveyDialog(survey: Survey) {
    // Reset the new survey to an empty Survey object
    this.editSurvey = this.globals.EMPTY_SURVEY;

    // Open dialog and keep a reference to it
    this.dialogRef = this.dialog.open(SurveyDialogComponent, {
      data: {
        title: survey ? survey.title : '',
        description: survey ? survey.description : '',
        url: survey ? survey.url : '',
        departments: survey ? survey.departments : ''
      }
    });

    // After the dialog is close, handle the data from the forms
    this.dialogRef.afterClosed().subscribe(data => {
      if (survey) {
        if (data) {
          data['surveyId'] = survey.id;
          this.surveyService.updateSurvey(data).subscribe(result => {
            // update surveys array to show the changes
            this.updateSurveyArrays(); }, error => {
            // error handling
          });
        } else {
          // error handling
        }
      } else {
        // error handling
      }
    });
  }

  // opens the list of employees that have not acknowledged that policy
  openListUnackDialog(survey) {
    let employees = Array<Employee>();
    this.usersService.getUnackedBySurveyID(survey.id).subscribe(result => {
      // populate employees array with data returned from backend call
      employees = result as Array<Employee>;

      // Open dialog and keep a reference to it
      this.dialog.open(AckListDialogComponent, {
        data: {
          title: survey.title,
          employees: employees
        }
      });
    }, error => {
      // error handling
    });
  }
}
