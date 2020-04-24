import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Patient} from '../model/Patient';
import {AppComponent} from '../app.component';
import {PatientDTO} from '../model/PatientDTO';
import {Credintials} from '../model/Credintials';
import {Token} from '../model/Token';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http;
  }

  addPatient(patient: Patient) {
    console.log('We are adding patient.');
    const patientDTO = new PatientDTO(patient);
    console.log(patientDTO);
    this.http.post<PatientDTO>(AppComponent.apiUrl + '/patient', patientDTO, AppComponent.headersObject)
      .subscribe(data => {
        console.log(data);
      });
  }

  getPatients() {
    console.log('Zaczynamy');
    this.http.get(AppComponent.apiUrl + '/patient', AppComponent.headersObject)
      .subscribe(data => {
        console.log(data);
      });
    console.log('Kończymy');
  }

  login(credentials: Credintials) {
    this.http.post<Token>(AppComponent.apiUrl + '/patient/login', credentials, AppComponent.headersObject)
      .subscribe(response => {
        localStorage.setItem('token', response.token);
      });
  }
}
