import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DailySchedule} from '../model/Schedule';
import {environment} from '../../environments/environment';
import {AppComponent} from '../app.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getDailySchedules(dayOfWeek: number, clinicId: number): Observable<DailySchedule[]> {
    return this.http.get<DailySchedule[]>(environment.apiUrl + '/schedules?dayOfWeek=' + dayOfWeek
      + '&clinicId=' + clinicId, AppComponent.headersObject);
  }
}
