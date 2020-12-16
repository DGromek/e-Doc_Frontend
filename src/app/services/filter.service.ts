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
  getClinicNames(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/clinicNames', AppComponent.headersObject);
  }
  getSpecialities(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/specialities', AppComponent.headersObject);
  }
  getDoctorsNames(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/doctorsNames', AppComponent.headersObject);
  }
}
