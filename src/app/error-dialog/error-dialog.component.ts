import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'rcc-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  errorMsg = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.errorMsg = data;
  }

  ngOnInit() {
  }

}
