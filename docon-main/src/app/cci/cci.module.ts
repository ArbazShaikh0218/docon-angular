import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material-module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetPasswordComponent } from './set-password/set-password.component';
import { PatientComponent } from './profile/patient/patient.component';
import { ProviderComponent } from './profile/provider/provider.component';
import { RouterModule } from '@angular/router';
import { OtpComponent } from './otp/otp.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SetPasswordComponent,
    PatientComponent,
    ProviderComponent,
    OtpComponent
  
   
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    
  
    
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class CciModule { }
