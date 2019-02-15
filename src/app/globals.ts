import { Injectable } from '@angular/core';
import { Department } from './department';
import { Policy } from './policy';
import {UserType} from './userType';

@Injectable()
export class Globals {
  departments: Department[] = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Garage' },
    { id: 3, name: 'Admin(HR)' },
    { id: 4, name: 'Food & Beverage' },
    { id: 5, name: 'Production' }
  ];

  userTypes: UserType[] = [
    { id: 1, name: 'Super User' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'Standard' },
    { id: 4, name: 'Department Head' }
  ];

  // User role definitions
  readonly SUPERUSER: number = 1;
  readonly ADMIN: number = 2;
  readonly STANDARD: number = 3;
  readonly DPTHEAD: number = 4;

  // Blank Policy constant
  EMPTY_POLICY = {
    id: null,
    title: '',
    description: null,
    departments: null,
    url: null,
    acknowledged: null,
    date: null,
    numHaveAcked: null,
    numHavePolicy: null
  };

  // Blank Survey constant
  EMPTY_SURVEY = {
    id: null,
    title: '',
    description: null,
    departments: null,
    url: null,
    acknowledged: null,
    date: null,
    numHaveAcked: null,
    numHaveSurvey: null
  };

  // Blank User constant
  EMPTY_USER = {
    fName: null,
    lName: null,
    email: null,
    phoneNum: null,
    department: null,
    status: null
  };

  // Bank Manage User Settings object constant
  EMPTY_MANAGE_USER_SETTINGS = {
    department: null,
    active: null,
    userType: null,
    userID: null
  };

}
