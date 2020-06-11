import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppComponent} from '../app.component';
import {Clinic} from '../model/Clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(AppComponent.apiUrl + '/clinics', AppComponent.headersObject);
  }
  getClinicSpecialists(id: number): Observable<string[]> {
    return this.http.get<string[]>(AppComponent.apiUrl + '/clinics/specialities/' + id, AppComponent.headersObject);
  }
}
