import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Patient} from '../model/Patient';
import {AppComponent} from '../app.component';
import {PatientDTO} from '../model/PatientDTO';
import {Credintials} from '../model/Credintials';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'responseType': 'json'
    })
  };

  constructor(private http: HttpClient) {
  }

  addPatient(patient: Patient) {
    console.log('We are adding patient.');
    const patientDTO = new PatientDTO(patient);
    console.log(patientDTO);
    this.http.post<PatientDTO>(AppComponent.apiUrl + '/patient', patientDTO, this.httpOptions)
      .subscribe(data => {
        console.log(data);
      });
  }

  getPatients() {
    console.log('Zaczynamy');
    this.http.get(AppComponent.apiUrl + '/patient', this.httpOptions)
      .subscribe(data => {
        console.log(data);
      });
    console.log('Kończymy');
  }

  login(credentials: Credintials) {
    this.http.post(AppComponent.apiUrl + '/patient/login', credentials, this.httpOptions)
      .subscribe(data => {
        console.log(data);
      });
  }
}
