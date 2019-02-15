import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PolicyComponent} from './policy/policy.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AlertsComponent } from './alerts/alerts.component';
import { EmailHRComponent } from './email-hr/email-hr.component';
import { SelectDepartmentsComponent } from './select-departments/select-departments.component';
import {SurveyComponent} from './survey/survey.component';
import {CsvCompareComponent} from './csv-compare/csv-compare.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'home', component: HomeComponent },
  { path: 'users', component: ManageUsersComponent},
  { path: 'policy', component: PolicyComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'alerts', component: AlertsComponent},
  { path: 'csv', component: CsvCompareComponent},
  { path: 'email-hr', component: EmailHRComponent},
  { path: 'user-settings', component: UserSettingsComponent },
  { path: 'select-departments', component: SelectDepartmentsComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
