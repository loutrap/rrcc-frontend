import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ValidationService } from '../services/validation.service';
import { UsersService } from '../services/users.service'

@Component({
  selector: 'rcc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../app.component.scss']
})
export class LoginComponent implements OnInit {

  // variables
  email: string;
  password: string;
  hideInvalidMsg = true;
  emailValid = true;
  passwordValid = true;

  // constructor
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private validationService: ValidationService) { }


  /**
   * ngOnInit checkes if the user is currently loggedIn and if they
   * are, redirects them back to the home page.
   */
  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      if (result) {
        this.router.navigate(['home']);
      }
    }, error => {
      // error handling
    });
  }

  /**
   * Login with entered credentials.
   * If successful it will take the user to the home page.
   * Upon failure, the user will remain on the login page and will be asked to re-enter credentials.
   */
  login() {
    this.authService.login(this.email, this.password).subscribe(result => {
      if (result) {
        this.hideInvalidMsg = true;
        this.usersService.setUser(result);
        // console.log("is this the role: " + (this.usersService.getUser()));
        this.router.navigate(['home']);
      }
    }, error => {
        this.hideInvalidMsg = false;
    });
  }

  /**
   * Validate Email verifies that the email is in a valid format
   * Returns true if the email is valid
   * @param email - string value of the email field
   */
  validateEmail(email) {
    this.emailValid = this.validationService.validateEmail(email);
  }

  /**
   * Validate Email verifies that the email is in a valid format
   * Returns true if the password is valid
   * @param password - string value of the password field
   */
  validatePassword(password) {
    this.passwordValid = this.validationService.validatePassword(password);
  }
}
