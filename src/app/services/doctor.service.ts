import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor} from '../model/Doctor';
import {AppComponent} from '../app.component';
import {environment} from '../../environments/environment';
import {DailySchedule} from '../model/Schedule';
import {Rating} from "../model/Rating";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllByClinicId(clinicId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(environment.apiUrl + '/doctors?clinicId=' + clinicId, AppComponent.headersObject);
  }

  getDoctorDailySchedule(dayOfWeek: number, clinicId: number, doctorId: number): Observable<DailySchedule> {
    return this.http.get<DailySchedule>(environment.apiUrl + '/schedules?dayOfWeek=' + dayOfWeek + '&clinicId=' + clinicId +
      '&doctorId=' + doctorId, AppComponent.headersObject);
  }

  getDoctorById(doctorId: number): Observable<Doctor> {
    return this.http.get<Doctor[]>(environment.apiUrl + '/doctors?doctorId=' + doctorId, AppComponent.headersObject)
      .pipe(
      map( singleElementList => {
        return singleElementList[0];
      })
    );
  }
  getDoctorRatings(doctorId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(environment.apiUrl + '/ratings?doctorId=' + doctorId, AppComponent.headersObject);
  }
}
