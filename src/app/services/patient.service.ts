import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Patient} from '../model/Patient';
import {AppComponent} from '../app.component';
import {PatientDTO} from '../model/PatientDTO';
import {Credintials} from '../model/Credintials';
import {Token} from '../model/Token';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  addPatient(patient: Patient): Observable<Patient> {
    console.log('We are adding patient.');
    const patientDTO = new PatientDTO(patient);
    console.log(patientDTO);
    return this.http.post<Patient>(AppComponent.apiUrl + '/patient', patientDTO, AppComponent.headersObject);
  }

  getPatients() {
    console.log('Zaczynamy');
    this.http.get(AppComponent.apiUrl + '/patient', AppComponent.headersObject)
      .subscribe(data => {
        console.log(data);
      });
    console.log('Kończymy');
  }

  login(credentials: Credintials): Observable<Token> {
    return this.http.post<Token>(AppComponent.apiUrl + '/patient/login', credentials, AppComponent.headersObject)
  }
}
