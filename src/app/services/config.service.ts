import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Department } from '../department';

const departments: Department[] = [
  { id: 1, name: 'Sales' },
  { id: 2, name: 'Garage' },
  { id: 3, name: 'Admin(HR)' },
  { id: 4, name: 'Food & Beverage' },
  { id: 5, name: 'Production' }
];

const rccUrl: string = "http://localhost:3000";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }), 
  withCredentials: true
};

//Twilio constants
const twilioPhoneNum = "5853022896";

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor() { }

  getDepartments(): Department[] {
    return departments;
  }

  getRccUrl(){
    return rccUrl;
  }

  getHttpOptions(){
    return httpOptions;
  }
}
