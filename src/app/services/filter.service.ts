import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
  getCities(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/cities', AppComponent.headersObject);
  }

  getClinicNames(selectedCity: string, selectedDoctor?: string): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/clinicNames'
      + '?city=' + selectedCity
      + (selectedDoctor !== undefined && selectedDoctor !== null ? '&doctorName=' + selectedDoctor : '')
      , AppComponent.headersObject);
  }
  getSpecialities(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/specialities', AppComponent.headersObject);
  }

  getDoctorsNames(selectedCity: string, selectedSpeciality: string, selectedClinic?: string): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/doctorsNames'
      + '?city=' + selectedCity
      + '&speciality=' + selectedSpeciality
      + (selectedClinic !== undefined && selectedClinic !== null ? '&clinicName=' + selectedClinic : '')
      , AppComponent.headersObject);
  }
}
