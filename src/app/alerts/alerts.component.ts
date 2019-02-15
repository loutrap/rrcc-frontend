import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Department } from '../department';
import { Message } from '../message';
import { Globals } from '../globals';
import { SelectDepartmentsComponent } from '../select-departments/select-departments.component';
import { SelectedDepartmentsService } from '../services/selected-departments.service';
import { ErrorDialogService } from '../services/error-dialog.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'rcc-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  providers: [SelectDepartmentsComponent]
})

export class AlertsComponent implements OnInit {

  // constants for user types
  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  // variables
  message: Message;
  selectedDepartments: Department[] = [];
  alertMessage = '';
  isDisabled = false;
  isDisabledGroup = false;
  isChecked = false;
  userType = null;
  userDeptName = null;
  currentDeptObj = null;

  // constructor
  constructor(private usersService: UsersService,
    private alertsService: AlertsService,
    private authService: AuthService,
    private router: Router,
    private globals: Globals,
    private selectDepartments: SelectDepartmentsComponent,
    private selectedDepartmentsService: SelectedDepartmentsService,
    private errorDialogService: ErrorDialogService,
    public snackBar: MatSnackBar) {}


  /**
   * ngOnInit checkes that user is logged in an permitted to view this specific
   * page or else they will be routed to the login page. it then sets various 
   * user variables from the user obj that is returned If the user is a DeptHead, 
   * it will only allow them to send messages to their dept.
   */
  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      this.userType = result['usertype']['id'];
      this.userDeptName = result['department']['name'];
      this.currentDeptObj = {id: result['department']['id'], name: result['department']['name']};
      if (result['usertype']['id'] === this.STANDARD) {
        this.router.navigate(['login']);
      } else if (result['usertype']['id'] === this.DPTHEAD) {
        this.selectedDepartments.push(this.currentDeptObj);
        this.selectedDepartmentsService.setSelectedDepartments(this.selectedDepartments);
        this.selectedDepartments.forEach(element => {
          console.log("dept head " + element.name)
        });
      }
    }, error => {
      this.router.navigate(['login']);
    });

    this.message = {
      message: undefined,
      departments: undefined,
    };
  }

  /**
   * SendMsg will put the selected departments from the user input checkboxes
   * into an array which will be added to a message object. It will then grab 
   * the text input from the UI and store it in a message object. This function
   * then calls the alerts service to make the request.
   * @param msg - a string that contains the alert message text inputted by the user
   */
  sendMsg(msg) {
    this.selectedDepartments = this.selectedDepartmentsService.getSelectedDepartments();

    if (this.selectedDepartments.length > this.globals.departments.length) {
      console.log('ERROR: department list is incorrect');
      return;
    }

    this.message.message = this.alertMessage;
    this.message.departments = this.selectedDepartments;
    this.alertsService.sendAlert(this.message).subscribe(result => {
      if (result) {
        // reset values on the page
        this.message = {
          message: undefined,
          departments: undefined,
        };
        this.selectedDepartments = [];
        this.alertMessage = '';
        // show a snackBar that says the alert was successfully sent
        this.snackBar.open('Alert successfully sent', 'Close');
      }
    }, error => {
      this.errorDialogService.setErrorMsg(error.errMsg);
      this.errorDialogService.openDialog(this.errorDialogService.getErrorMsg());
    });
  }
}
