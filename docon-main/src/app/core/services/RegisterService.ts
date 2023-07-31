import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials, Gender, LoginModel, Prefix } from './datamodel/PatientRegisteration';


const BASE_URL = 'http://localhost:8081/';
const PERSONS_URL = BASE_URL + '/persons';
const PATIENTS_REGISTER_URL = BASE_URL + 'patients';
const GENDERS_URL= BASE_URL + 'genders';
const PREFIXS_URL= BASE_URL + 'prefixs'

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  isLoggedIn(){}


  
  createPatient(patientModel: {
    person: {
      prefix: string | undefined;
      firstName: string | undefined;
      lastName: string | undefined;
      phoneNumber: string | undefined;
      dob: Date | undefined;
      gender: string | undefined;
      account: {
        emailId: string | undefined;
      };
    };
  }): Observable<object> {
    return this.http.post<object>(PATIENTS_REGISTER_URL, patientModel);
  }

  enrollment(enrollmentId: any): Observable<string> {
    return this.http.get<any>(
      `http://localhost:8081/enrollments/${enrollmentId}`
    );
  }

  getPrefix(): Observable<{ prefix: Prefix }[]> {
    return this.http.get<{ prefix: Prefix }[]>(PREFIXS_URL);
  }

  getGender(): Observable<{ gender: Gender }[]> {
    return this.http.get<{ gender: Gender }[]>(GENDERS_URL);
  }



  accountLogin(login:LoginModel): Observable<object> {
    return this.http.post<object>(BASE_URL+'accounts',login);
  }
 


  createPassword(enrollmentId:string, credentials: Credentials ): Observable<object> {
    console.log(credentials);
    return this.http.patch<object>(`http://localhost:8081/enrollments/${enrollmentId}`, credentials);
  }







}
