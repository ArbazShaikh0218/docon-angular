import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountModel,
  Gender,
  PatientModel,
  PersonModel,
  Prefix,
  Role,
} from 'src/app/core/services/datamodel/PatientRegisteration';
import { RegisterService } from 'src/app/core/services/RegisterService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage?: string;
  person: PersonModel = new PersonModel();
  account: AccountModel = new AccountModel();
  patient: PatientModel = new PatientModel();
  passcode!: string;

  img = '../../assets/Removal-524.png';
  logo = '../../assets/logo.png';

  accountValue = {
    emailId: this.account.emailId,
  };

  personValue = {
    prefix: this.person.prefix,
    firstName: this.person.firstName,
    lastName: this.person.lastName,
    phoneNumber: this.person.phoneNumber,
    dob: this.person.dob,
    gender: this.person.gender,
    account: this.accountValue,
  };

  patientValue = {
    person: this.personValue,
  };

  prefixValue: { prefix: Prefix }[] = [];
  genderValue: { gender: Gender }[] = [];
  role: { role: Role }[] = [];

  rf = new PersonModel();
  ar = new AccountModel();

  constructor(private registerService: RegisterService,  private router: Router,) {}

  reactiveRegisterForm = new FormGroup({
    prefix:new FormControl(),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),]),
    dob: new FormControl('', Validators.required),
    gender:new FormControl(),
  });

  get firstName(): FormControl {
    return this.reactiveRegisterForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.reactiveRegisterForm.get('lastName') as FormControl;
  }

  get emailId(): FormControl {
    return this.reactiveRegisterForm.get('emailId') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.reactiveRegisterForm.get('phoneNumber') as FormControl;
  }

  get dob(): FormControl {
    return this.reactiveRegisterForm.get('dob') as FormControl;
  }

  get prefix(): FormControl {
    return this.reactiveRegisterForm.get('prefix') as FormControl;
  }
  get gender(): FormControl {
    return this.reactiveRegisterForm.get('gender') as FormControl;
  }

  ngOnInit(): void {
    this.personValue.phoneNumber?.toString;
    this.masterData();
  }

  masterData() {
    this.registerService.getPrefix().subscribe(
      (data) => {
        this.prefixValue = data;
      },
      (error) => {
        console.error(error);
      }
    );

    this.registerService.getGender().subscribe(
      (data) => {
        this.genderValue = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  Register() {

  //  const accountValue:AccountModel = {
  //     emailId: form.value.emailId,
  //   };
  
  //  const personValue:PersonModel = {
  //     prefix: form.value.prefix,
  //     firstName: form.value.firstName,
  //     lastName: form.value.lastName,
  //     phoneNumber:form.value.phoneNumber,
  //     dob:form.value.dob,
  //     gender:form.value.gender,
  //     account: accountValue,
  //   };
  
  //  const patientValue:PatientModel = {
  //     person: personValue,
  //   };



    if(this.reactiveRegisterForm.value){
    if (this.reactiveRegisterForm.valid) {
      this.registerService.createPatient(this.patientValue).subscribe(
        (response: any) => {
          alert(response.message+" check your mail to create password");
          this.router.navigateByUrl(`/login`)
        },
        (error: HttpErrorResponse) => {
          if (error.status == 400) {
            alert('error in backend service !');
          }
        }
      );
    } 
    else {alert('please add a valid data with all required field');}}
    else{alert('please add a data');}
}

  prefixFun(e: any) {
    this.personValue.prefix = e.target.value;
  }

  genderFun(e: any) {
    this.personValue.gender = e.target.value;
  }

  // roleFun(e:any){
  // this.userValue.role=e.target.value;
  // }
}
