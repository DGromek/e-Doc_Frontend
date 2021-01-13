import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../model/Patient';
import {AppComponent} from '../app.component';
import {PatientDTO} from '../model/PatientDTO';
import {Credintials} from '../model/Credintials';
import {Token} from '../model/Token';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

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
    return this.http.post<Patient>(environment.apiUrl + '/patients', patientDTO, AppComponent.headersObject);
  }

  // Test method, to be deleted in future.
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(environment.apiUrl + '/patients', AppComponent.headersObject);
  }

  login(credentials: Credintials): Observable<Token> {
    return this.http.post<Token>(environment.apiUrl + '/patients/login', credentials, AppComponent.headersObject);
  }

  getPatientByAppointmentId(appointmentId: number): Observable<Patient> {
    return this.http.get<Patient>(environment.apiUrl + '/patients/patientsSignature' +
      '?appointmentId=' + appointmentId, AppComponent.headersObject);
  }
}
