import { Department } from './department';

/* Manage User Settings interface represents a user's settings on the manage users page
 with a user ID, department, role, and active status */
export interface ManageUserSettings {
  userID: number;
  department: Department;
  userType: number;
  active: boolean;
}
