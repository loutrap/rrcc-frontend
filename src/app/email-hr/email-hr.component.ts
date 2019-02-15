import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertsService} from '../services/alerts.service';
import {AuthService} from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { Email } from '../email';
import { MatSnackBar } from '@angular/material';
import { ErrorDialogService } from '../services/error-dialog.service';



@Component({
  selector: 'rcc-email-hr',
  templateUrl: './email-hr.component.html',
  styleUrls: ['./email-hr.component.scss']
})

export class EmailHRComponent implements OnInit {

  // variables
  email: Email;
  currentUser = null;
  emailMessage = null;

  // constructor
  constructor(private alertsService: AlertsService, 
    private authService: AuthService,
    private router: Router, 
    private emailService: EmailService,
    private errorDialogService: ErrorDialogService,
    public snackBar: MatSnackBar) {}
  
  
  /**
   * ngOnInit checkes that user is logged in an permitted to view this specific
   * page or else they will be routed to the login page.
   */            
  ngOnInit() {
    this.authService.loggedIn().subscribe(result => {
      console.log(result);
      this.currentUser = result['email'];
    }, error => {
      this.router.navigate(['login']);
    });

    this.email = {
      message: undefined,
      email: undefined,
    };
  }

  /**
   * SendMessage will put the users email address and user inputted email message
   * into an email object. It will then call the emailService to make the request
   * to the backend to send the email.
   * @param msg - a string that contains the email message inputted by the user
   */
  sendMessage(msg: String){
    this.email.message = this.emailMessage;
    this.email.email = this.currentUser;
    this.emailService.sendEmail(this.email).subscribe(result => {
      if (result) {
        // reset values on the page
        this.email = {
          message: undefined,
          email: undefined,
        };
        this.emailMessage = '';
        // show a snackBar that says the alert was successfully sent
        this.snackBar.open('Email successfully sent', 'Close');
      }
    }, error => {
      this.errorDialogService.setErrorMsg(error.errMsg);
      this.errorDialogService.openDialog(this.errorDialogService.getErrorMsg());
    });
  }
}
