import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'rcc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  // variables
  email: string;
  resetPasswordObj = {};
  

  // constrcutor
  constructor(private usersService: UsersService,
    private router: Router,
    private authService: AuthService,) {}

  /**
   * ngOnInit initializes the resetPasswordObj
   */
  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      if (result) {
        this.router.navigate(['home']);
      }
    }, error => {
      // error handling
    });
    this.resetPasswordObj = {
      eId: undefined,
      password: undefined,
      email: undefined

    }
  }

  /**
   * sendEmailForPasswordReset will set the email address of the user
   * to the resetPasswordObj and call the usersService's forgotPassword
   * method to make request to the back end which will send the user a 
   * temporary password to the email address they provided.
   */
  sendEmailForPasswordReset(){
    this.resetPasswordObj['email'] = this.email;
    this.usersService.forgotPassword(this.resetPasswordObj).subscribe(result =>{
      this.router.navigate(['/login']);
    }, error => {

    });
  }
}
