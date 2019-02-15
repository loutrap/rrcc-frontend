import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Registrant } from '../registrant';
import { Department } from '../department';
import { UsersService } from '../services/users.service';
import { ConfigService } from '../services/config.service';
import { ValidationService } from '../services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogService } from '../services/error-dialog.service';

@Component({
  selector: 'rcc-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss', '../app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
  departments: Department[];
  registrant: Registrant;
  passwordRepeated: string;
  // holds each part of the phone number
  phone1 = '';
  phone2 = '';
  phone3 = '';
  // used to display error messages
  fNameValid = true;
  lNameValid = true;
  phoneValid = true;
  emailValid = true;
  pw1Valid = true;
  pw2Valid = true;
  pwMatch = true;


  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private validationService: ValidationService,
    private route: ActivatedRoute,
    private router: Router,
    private errorDialogService: ErrorDialogService
  ) { }

  ngOnInit() {
    // Initialize registrant object
    this.registrant = {
      fName: undefined,
      lName: undefined,
      email: undefined,
      phoneNum: '',
      department: undefined,
      password: undefined
    };

    // populates departments
    this.departments = this.configService.getDepartments();
  }

  /**
   * Register attempts to add the user to the DB
   * If any of the fields do not pass validation, display an error message
   * If all fields validate, make a call to the backend to add the user to the DB
   */
  register() {
    this.registrant.phoneNum = '+1' + this.phone1 + this.phone2 + this.phone3;
    // Registration page fields validation
    if (!(this.validationService.validateRegistrant(this.registrant))) {
      // TODO: add error messages
      return;
    }
    this.usersService.register(this.registrant).subscribe(result => {
      this.router.navigate(['login']);
    }, error => {
      this.errorDialogService.setErrorMsg(error.errMsg);
      this.errorDialogService.openDialog(this.errorDialogService.getErrorMsg());
    });
  }

  /**
   * Validate Field is used to validate the registrant's information
   * @param value - a string representing the value in the field
   * @param type - a string that is used in the switch statement to select the validation function
   */
  validateField(value, type) {
    switch (type) {
      case 'fName' : this.fNameValid = this.validationService.validateName(value); break;
      case 'lName' : this.lNameValid = this.validationService.validateName(value); break;
      case 'email' : this.emailValid = this.validationService.validateEmail(value); break;
      case 'phone' : this.registrant.phoneNum = '+1' + this.phone1 + this.phone2 + this.phone3;
        this.phoneValid = this.validationService.validatePhoneNumber(this.registrant.phoneNum); break;
      case 'pw1' : this.pw1Valid = this.validationService.validatePassword(value); break;
      case 'pw2' : this.pw2Valid = this.validationService.validatePassword(value); break;
    }
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
}
