import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Department } from '../department';
import { ConfigService } from '../services/config.service';
import {AlertsService} from '../services/alerts.service';
import { Router } from '@angular/router';
import { UpdatedEmployee } from '../updatedEmployee';
import { UsersService } from '../services/users.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'rcc-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  // Class variables
  updatedUser: UpdatedEmployee;
  eId: number = null;
  fName: string = null;
  lName: string = null;
  email: string = null;
  phone: string = null;
  newPassword: string = null;
  newPasswordRepeated: string = null;
  pw1Valid = true;
  pw2Valid = true;
  pwMatch = true;
  updatedUserInfo = {};
  updatedPassword = {};

  constructor(private alertsService: AlertsService,
      private authService: AuthService,
      private configService: ConfigService,
      private router: Router,
      private usersService: UsersService,
      private validationService: ValidationService) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      this.eId = result['eId'];
      this.fName = result['fname'];
      this.lName = result['lname'];
      this.email = result['email'];
      this.phone = result['phone'];

      this.updatedPassword = {
        eId: result['eId'],
        password: undefined,
        email: undefined
        };

      this.updatedUser = {
        eId: this.eId,
        fName: undefined,
        lName: undefined,
        email: undefined,
        phone: '',
      };
    }, error => {
      this.router.navigate(['login']);
    });
  }


  /**
   * updateUser will set the updatedUser obj with the data inputted
   * into the form fields by the user. This obj is sent to the updateUser
   * function in hte usersService
   */
  updateUserInfo() {
    this.updatedUser.fName = this.fName;
    this.updatedUser.lName = this.lName;
    this.updatedUser.email = this.email;
    this.updatedUser.phone = this.phone;

    this.usersService.updateUser(this.updatedUser).subscribe(result => {
      this.callLogoutService();
    }, error => {
      // error handling
    });

  }


  /**
   * updateUser will set the updatedUser obj with the data inputted
   * into the form fields by the user. This obj is sent to the updateUser
   * function in hte usersService
   */
  callLogoutService() {
    this.authService.logout().subscribe(result => {}, error => {});
    this.router.navigate(['/login']);
  }

  /**
   * updateUserPassword will allow the user the change their password. It takes the
   * new password and calls the updatePassword function in the usersService with the
   * updated password passed.
   */
  updateUserPassword() {
    this.updatedPassword['password'] = this.newPassword;
    this.usersService.updatePassword(this.updatedPassword).subscribe(result => {
      this.callLogoutService();

    }, error => {
      // error handling
    });
  }

  /**
   * Password Match is used to check that the re-entered password is the same as the first entered password
   * Returns true if the passwords are the same and valid.
   * @param pw1 - a string of the value in the first password field
   * @param pw2 - a string of the value in the second password field
   */
  passwordMatch(pw1, pw2) {
    this.pwMatch = this.validationService.validatePasswordMatch(pw1, pw2);
  }

  /**
   * Validate Field is used to validate the registrant's information
   * @param value - a string representing the value in the field
   * @param type - a string that is used in the switch statement to select the validation function
   */
  validateField(value, type) {
    switch (type) {
      case 'pw1' : this.pw1Valid = this.validationService.validatePassword(value); break;
      case 'pw2' : this.pw2Valid = this.validationService.validatePassword(value); break;
    }
  }
}
