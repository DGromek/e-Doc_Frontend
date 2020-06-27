import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor} from '../model/Doctor';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  findAllByClinicId(clinicId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(AppComponent.apiUrl + '/doctors?clinicId=' + clinicId, AppComponent.headersObject);
  }

  findAllByClinicIdAndDoctorSpeciality(clinicId: number, speciality: string) {
    return this.http.get<Doctor[]>(AppComponent.apiUrl + '/doctors' +
      '?clinicId=' + clinicId +
      '&speciality=' + speciality, AppComponent.headersObject);
  }
}
