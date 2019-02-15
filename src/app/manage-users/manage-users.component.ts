import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Globals } from '../globals';
import { MatDialog, MatDialogConfig, MatDialogRef, MatExpansionPanel, MatSlideToggle } from '@angular/material';
import {PolicyDialogComponent} from '../policy-dialog/policy-dialog.component';
import {Policy} from '../policy';
import {Registrant} from '../registrant';
import {Validators} from '@angular/forms';
import {ManageUserSettings} from '../manageUserSettings';

@Component({
  selector: 'rcc-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  // User Information Variables
  editUserSettings = this.globals.EMPTY_MANAGE_USER_SETTINGS as ManageUserSettings;
  userDepartments = this.globals.departments;
  userTypes = this.globals.userTypes;
  userID: number = null;
  userType: number = null;
  displayedColumns = ['name', 'email', 'department', 'userType', 'active'];
  employees: Array<Registrant> = [];

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  constructor(private authService: AuthService,
              private router: Router,
              private usersService: UsersService,
              private dialog: MatDialog,
              private globals: Globals) { }

  ngOnInit() {
    // authenticate the user
    this.authService.loggedIn().subscribe(result => {
      // Set userID to what was given from authService
      this.userID = result['eId'];
      this.userType = result['usertype']['id'];
      this.updateEmployees();
    }, error => {
      this.router.navigate(['login']);
    }, () => {
      // Do Nothing
    });
  }

  // calls the backend for a list of all employees
  updateEmployees() {
    // empty the employees table
    this.employees = Array<Registrant>();

    // If the user is an admin, get all of the employees
    if (this.userType === this.SUPERUSER || this.userType === this.ADMIN) {
      this.usersService.getUsers().subscribe(result => {
        for (const employee of result as Array<Object>) {
          const e = {
            'fName': employee['fname'],
            'lName': employee['lname'],
            'email': employee['email'],
            'phoneNum': employee['phone'],
            'department': employee['departmentID'],
            'password': employee['password'],
            'status': employee['status'] === 1,
            'userID': employee['eID'],
            'userType': employee['usertypeID']
          } as Registrant;
          this.employees.push(e);
        }

        console.log('all employees:');
        console.log(this.employees);
      }, error => {
        console.log('Error retrieving employees');
        console.log(error);
      });
    }
  }

  // Updates the database to match the editted user settings
  // Unused, but could be wanted for a different mode of editting user data
  updateManagedUser() {
    // update the department
    this.usersService.updateManagedUserDepartment(this.editUserSettings).subscribe(result => {
      // do nothing
    }, error => {
      console.log('Failure to update the user\'s department.');
      console.log(error);
    });

    // update the user type
    this.usersService.updateManagedUserType(this.editUserSettings).subscribe(result => {
      // do nothing
    }, error => {
      console.log('Failure to update the user\'s type.');
      console.log(error);
    });

    // update the user's active status
    this.updateUserStatus(this.editUserSettings.active, this.editUserSettings.userID);

    // update the employee list
    this.updateEmployees();
  }

  // Updates the user's department in the database
  updateDepartment(dept, userID) {
    // set the form's option's id to be the new department
    this.editUserSettings.department = dept;
    this.editUserSettings.userID = userID;

    // update the department
    this.usersService.updateManagedUserDepartment(this.editUserSettings).subscribe(result => {
      // update the employee list
      this.updateEmployees();
    }, error => {
      console.log('Failure to update the user\'s department.');
      console.log(error);
    });
  }

  // Updates the user's role in the database
  updateUserType(type, userID) {
    if (this.userType === this.SUPERUSER) {
      // set the form's option's id to be the new usertype
      this.editUserSettings.userType = type;
      this.editUserSettings.userID = userID;

      // update the user type
      this.usersService.updateManagedUserType(this.editUserSettings).subscribe(result => {
        // update the employee list
        this.updateEmployees();
      }, error => {
        console.log('Failure to update the user\'s type.');
        console.log(error);
      });
    }
  }

  // Updates the database to match the editted user status
  updateUserStatus(active: boolean, userID: number) {
    const data  = {
      active: active,
      userID: userID
    } as ManageUserSettings;

    this.usersService.updateManagedUserStatus(data).subscribe(result => {
      // update the employee list
      this.updateEmployees();
    }, error => {
      console.log('Failure to update the user\'s status.');
      console.log(error);
    });
  }

}
