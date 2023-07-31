import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgForm,
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { RegisterService } from 'src/app/core/services/RegisterService';
import {
  Credentials,
  LoginModel,
} from 'src/app/core/services/datamodel/PatientRegisteration';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  logInForm: FormGroup ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService,
    private fb: FormBuilder
  ) {
    this.logInForm = this.fb.group({
      emailId: new FormControl('', [Validators.email, Validators.required]),
      passcode: new FormControl('', [
        Validators.required,
        Validators.minLength(8), // Minimum password length
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]+$') // Password pattern
     ]),
    });
  }

  // img="../../assets/Group of doctors standing at hospital building.jpg";
  img = '../../assets/Removal-524.png';
  logo = '../../assets/logo.png';

  ngOnInit() {
    //   if (this.registerService.isLoggedIn()) {
    //     this.router.navigate(['/home']);
    //   }
    // }
    // onSubmit() {
    //   this.registerService.login(this.email, this.password)
    //     .subscribe(
    //       () => {
    //         this.router.navigate(['/home']);
    //       },
    //       (error) => {
    //         this.errorMessage = error.message;
    //       }
    //     );
    // }
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //   if (!this.registerService.isLoggedIn()) {
    //     this.router.navigate(['/auto-login']);
    //     return false;
    //   }
    //   return true;
  }

  get emailId(): FormControl {
    return this.logInForm?.get('emailId') as FormControl;
  }
  get passcode(): FormControl {
    return this.logInForm?.get('passcode') as FormControl;
  }

 

  onFormSubmit(form: any) {
    console.log(form.value);
    const data: LoginModel = {
      emailId: form.value.emailId,
      password: form.value.passcode,
    };

    if (form.valid && form.value) {
      this.registerService.accountLogin(data).subscribe(
        (response: any) => {
          alert(response.message);
          this.router.navigateByUrl(`/patients/${response.id}`);
        },
        (error: HttpErrorResponse) => {
          if (error.status == 400) {
            alert('Email and Password is not valid please write correct one');
          } else {
            alert('error in backend service !');
          }
        }
      );
    } 
    // else {
    //   alert('please add a valid data');
    // }
  }
}
