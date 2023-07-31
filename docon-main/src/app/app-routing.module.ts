import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cci/login/login.component';
import { RegisterComponent } from './cci/register/register.component';
import { SetPasswordComponent } from './cci/set-password/set-password.component';
import { PatientComponent } from './cci/profile/patient/patient.component';
import { ProviderComponent } from './cci/profile/provider/provider.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'enrollments/:id',
    component: SetPasswordComponent,
  },

  {
    path: 'registers',
    component: RegisterComponent,
  },
  {
    path: 'patients/:id',
    component: PatientComponent,
  },
  {
    path: 'providers/:id',
    component: ProviderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
