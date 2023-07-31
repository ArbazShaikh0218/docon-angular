import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from 'src/app/core/services/RegisterService';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit{





  enrollmentId!: any | null;
  
  passwordMatch: boolean = false;

  createPasswordForm:FormGroup;

  // email!:string;
  // dob!:Date;
  // password!:string;
  // confirmPass!: string;
  img="../../assets/Removal-524.png";
  logo="../../assets/logo.png";


 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService,
    private fb: FormBuilder
   
  ) {
    this.route.paramMap.subscribe((params) => {
    this.enrollmentId = params.get('id');
    console.log(this.enrollmentId);})

    this.createPasswordForm = this.fb.group({
      emailId:new FormControl("",[Validators.required,Validators.email]),
      dateOfBirth:new FormControl("",[Validators.required]),
      passcode: new FormControl("",[Validators.required, Validators.minLength(8), 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]+$')]),
      confirmPassword:new FormControl("",[Validators.required]),
    },
    {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.authenticationPerson();
    console.log("ngOnInit() call")
  }
  
  authorization(guid: any) {
    this.router.navigate(['enrollments', guid]);
  }

  authenticationPerson() {
    // this.route.paramMap.subscribe((params) => {
    //   this.enrollmentId = params.get('id');
      console.log(this.enrollmentId);

      this.registerService.enrollment(this.enrollmentId).subscribe(
        (response: any) => {
          if (this.enrollmentId === response.enrollmentID) {
            this.authorization(response.enrollmentID);
          } else {
            this.router.navigateByUrl('/registers');
            alert('Invalid URL');
          }
        },
        (error) => {
          console.log('Error retrieving enrollment data');
          this.router.navigateByUrl('/registers');
          alert('Invalid URL');
        }
      );
    
  }

  // createPasswordForm = this.fb.group({
  //   emailId: ['', [Validators.required, Validators.email]],
  //   dateOfBirth: ['', Validators.required,],
  //   passcode: ['', Validators.required,Validators.minLength(8),Validators.maxLength(15)],
  //   confirmPassword: ['', Validators.required,Validators.minLength(8),Validators.maxLength(15)],
  // }, {
  //   validators: this.passwordMatchValidator
  // });

  get emailId(): FormControl {
    return this.createPasswordForm.get('emailId') as FormControl;
  }

  get dateOfBirth(): FormControl {
    return this.createPasswordForm.get('dateOfBirth') as FormControl;
  }

  get passcode(): FormControl {
    return this.createPasswordForm.get('passcode') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.createPasswordForm.get('confirmPassword') as FormControl;
  }

  // passwordMatchValidator(control: FormGroup) {
  //   const password:any = control.get('passcode');
  //   const confirmPassword:any = control.get('confirmPassword');
  
  //   if (password !==  confirmPassword) {
  //     confirmPassword.setErrors({ passwordMatch: true });
  //   } else {
  //     confirmPassword.setErrors(null);
  //   }
  // }

  passwordMatchValidator(createPasswordForm: FormGroup) {
    const password = createPasswordForm.get('passcode')!.value;
    const confirmPassword = createPasswordForm.get('confirmPassword')!.value;

    if (password !== confirmPassword) {
      createPasswordForm.get('confirmPassword')!.setErrors({ mismatch: true });
    } else {
      createPasswordForm.get('confirmPassword')!.setErrors(null);
    }
  }


  onFormSubmit(createPasswordForm:any) {
    console.log('Form is Submitted'); 
    console.log(this.enrollmentId,createPasswordForm.value.emailId,createPasswordForm.value.passcode,createPasswordForm.value.confirmPassword,createPasswordForm.value.dateOfBirth ) 
    const credentials={
      emailId:createPasswordForm.value.emailId,
      dob:createPasswordForm.value.dateOfBirth,
      password:createPasswordForm.value.passcode
    }
  
if(createPasswordForm.valid && createPasswordForm.value){
    if (createPasswordForm.value.confirmPassword === createPasswordForm.value.passcode) {
      this.registerService.createPassword(this.enrollmentId,credentials).subscribe(
      (response: any) => {alert(response.message)
        this.router.navigateByUrl('/login');
      },
      (error: HttpErrorResponse) => {
        if(error.status==400){
          alert("Email and Date of birth is not valid please write correct one") 
        }
        else{
          alert("error in backend service !") 
        }
      }
      );
    }
    else{ alert("password not match with confirm password")}
  }
  else{alert('please add a valid data');}
}
}

