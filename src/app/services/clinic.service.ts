import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppComponent} from '../app.component';
import {Clinic} from '../model/Clinic';
import {environment} from '../../environments/environment';
import {Schedule} from '../model/Schedule';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(environment.apiUrl + '/clinics', AppComponent.headersObject);
  }
  getClinicSpecialists(id: number): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/clinics/specialities/' + id, AppComponent.headersObject);
  }
  getClinic(id: number): Observable<Clinic> {
    return this.http.get<Clinic>(environment.apiUrl + '/clinics/' + id, AppComponent.headersObject);
  }

  getClinicOpeningHours(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(environment.apiUrl + '/clinics/openingHours/' + id, AppComponent.headersObject);
  }
}
