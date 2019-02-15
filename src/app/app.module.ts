import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { PolicyComponent } from './policy/policy.component';
import { AppRoutingModule } from './app-routing.module';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AlertsComponent } from './alerts/alerts.component';
import { EmailHRComponent } from './email-hr/email-hr.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { PolicyDialogComponent } from './policy-dialog/policy-dialog.component';
import { Globals } from './globals';
import { SelectDepartmentsComponent } from './select-departments/select-departments.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyDialogComponent } from './survey-dialog/survey-dialog.component';
import { CsvCompareComponent } from './csv-compare/csv-compare.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AckListDialogComponent } from './ack-list-dialog/ack-list-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    PolicyComponent,
    UserSettingsComponent,
    AlertsComponent,
    EmailHRComponent,
    ErrorDialogComponent,
    PolicyDialogComponent,
    SelectDepartmentsComponent,
    SurveyComponent,
    SurveyDialogComponent,
    CsvCompareComponent,
    ManageUsersComponent,
    AckListDialogComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule
  ],
  exports: [
    ErrorDialogComponent,
    PolicyDialogComponent,
    SurveyDialogComponent,
    AckListDialogComponent
  ],
  entryComponents: [
    ErrorDialogComponent,
    PolicyDialogComponent,
    SurveyDialogComponent,
    AckListDialogComponent
  ],
  providers: [ Globals ],
  bootstrap: [AppComponent]
})
export class AppModule { }
