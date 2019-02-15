import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { MatTableModule, MatTableDataSource } from '@angular/material';
import {CsvCompareService} from '../services/csv-compare.service';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/users/csvCompare';

@Component({
  selector: 'rcc-csv-compare',
  templateUrl: './csv-compare.component.html',
  styleUrls: ['./csv-compare.component.scss']
})
export class CsvCompareComponent implements OnInit {

  // Class Variables
  userID: number = null;
  userType: number = null;
  public uploader: FileUploader = new FileUploader(
    {url: URL,
            itemAlias: 'csvCompare'});
  newEmployees: Array<Employee>;
  existingEmployees: Array<Employee>;
  displayedColumns = ['name', 'phone', 'email'];
  expandNewEmployees = false;

  private EMPTY_EMPLOYEE = {
    name: null,
    phone: null,
    email: null,
    active: null
  } as Employee;

  constructor(private authService: AuthService,
              private router: Router,
              private csvService: CsvCompareService) {
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      // set the employee array values
      this.setEmployees(JSON.parse(response));
      // expand new employees panel
      this.expandNewEmployees = true;
      // console.log('ImageUpload:uploaded:', item, status, response);
    };
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      console.log('Error during Upload:', item, status, response);
    };
  }

  ngOnInit() {
    // authenticate the user
    this.authService.loggedIn().subscribe(result => {
      // Set userID to what was given from authService
      this.userID = result['eId'];
      this.userType = result['usertype']['id'];
    }, error => {
      this.router.navigate(['login']);
    }, () => {
      // Do Nothing
    });
  }

  setEmployees(response) {
    // reset employee arrays
    this.newEmployees = [];
    this.existingEmployees = [];

    // format and assign new employees
    for (const entry of response[0]) {
      const employee: Employee = Object.create(this.EMPTY_EMPLOYEE);
      employee.name = entry['Name'];
      employee.email = entry['Personal eMail'];
      employee.phone = entry['Home Cell'];
      this.newEmployees.push(Object.create(employee));
    }

    // format and assign existing employees
    for (const entry of response[1]) {
      const employee: Employee = Object.create(this.EMPTY_EMPLOYEE);
      employee.name = entry['lname'] + ', ' + entry['fname'];
      employee.email = entry['email'];
      employee.phone = entry['phone'];
      this.existingEmployees.push(employee);
    }
  }

  uploadFile() {
    // clear excess queue items
    while (this.uploader.queue.length > 1) {
      this.uploader.queue[0].remove();
    }

    // check file type
    if (this.uploader.getNotUploadedItems()[0]) {
      const name = this.uploader.getNotUploadedItems()[this.uploader.getNotUploadedItems().length - 1].some.name;
      if (name.substr(name.length - 4, 4) === '.csv') {
        console.log('file is a csv');
        console.log(this.uploader);
        this.uploader.uploadAll();
      } else {
        // remove incorrect file types from the queue
        console.log('wrong file type');
        this.uploader.queue[0].remove();
      }
    } else {
      console.log('no file?');
    }
  }
}
