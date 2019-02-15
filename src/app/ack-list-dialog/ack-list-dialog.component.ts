import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'rcc-ack-list-dialog',
  templateUrl: './ack-list-dialog.component.html',
  styleUrls: ['./ack-list-dialog.component.scss']
})
export class AckListDialogComponent implements OnInit {

  result = null;
  employees: Array<any>;
  displayedColumns = ['name', 'phone', 'email'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data ) {
      this.result = data;
    }

  ngOnInit() {
    this.employees = this.result['employees'];
  }
}

