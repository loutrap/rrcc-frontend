import { Department } from './department';

/* Registrant interface represents a new registering user with a name, email, phone, department, and password */
export interface Registrant {
    fName: string;
    lName: string;
    email: string;
    phoneNum: string;
    department: Department;
    password: string;
}
