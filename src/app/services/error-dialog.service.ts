import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  errorMsg = "";

  constructor(public dialog: MatDialog) { }

  // sets the text of the error message
  setErrorMsg(error: string) {
    this.errorMsg = error;
  }

  // gets the text of the error message
  getErrorMsg():string {
    return this.errorMsg;
  }

  // opens the error message dialog box
  openDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {data: errorMsg});
  }
}

// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'dialog-content-example-dialog.html',
// })
// export class DialogContentExampleDialog {}
