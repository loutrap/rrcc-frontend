import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Policy } from '../policy';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Globals } from '../globals';
import {filter} from 'rxjs/operators';
import { Department } from '../department';
import { SelectDepartmentsComponent } from '../select-departments/select-departments.component';
import { SelectedDepartmentsService } from '../services/selected-departments.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'rcc-edit-policy-dialog',
  templateUrl: './policy-dialog.component.html',
  styleUrls: ['./policy-dialog.component.scss']
})
export class PolicyDialogComponent implements OnInit {

  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  policy: Policy;
  form: FormGroup;
  selectedDepartments: Department[] = [];
  userType: number = null;
  userDeptName: string = null;
  currentDeptObj = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PolicyDialogComponent>,
    private globals: Globals,
    private selectedDepartmentsService: SelectedDepartmentsService,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data ) {
    this.policy = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.policy.title, Validators.required],
      description: [this.policy.description, Validators.required],
      url: [this.policy.url, Validators.required],
    });
    this.authService.loggedIn().subscribe(result => {
      this.userType = result['usertype']['id'];
      this.userDeptName = result['department']['name'];
      this.currentDeptObj = {id: result['department']['id'], name: result['department']['name']};
      if (result['usertype']['id'] === this.STANDARD) {
        this.router.navigate(['login']);
      } else if (result['usertype']['id'] === this.DPTHEAD) {
        this.selectedDepartments.push(this.currentDeptObj);
        this.selectedDepartmentsService.setSelectedDepartments(this.selectedDepartments);
      }
    }, error => {
      this.router.navigate(['login']);
    });
  }

  // Returns the selected departments from the checkboxes
  getSelected() {
    this.selectedDepartments = this.selectedDepartmentsService.getSelectedDepartments();
    return this.selectedDepartments;
  }

  // Sends the data from the dialog form back to the Policy component
  submit(form) {
    const data = this.form.getRawValue();
    data['depts'] = this.getSelected();

    // append http to beginning of link if it is not there
    if (
      data['url'].substr(0, 7) !== 'http://'
      && data['url'].substr(0, 8) !== 'https://'
      && data['url'] !== '') {
        data['url'] = 'http://' + data['url'];
    }
    return this.dialogRef.close(data);
  }

  // closes the dialog modal
  close() {
    this.dialogRef.close();
  }
}
