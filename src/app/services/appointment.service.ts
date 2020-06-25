import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppComponent} from '../app.component';
import {Appointment} from '../model/Appointment';
import {map} from 'rxjs/operators';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Time} from '../model/Time';
import {AppointmentDTO} from '../model/AppointmentDTO';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(AppComponent.apiUrl + '/appointments', AppComponent.headersObject)
      .pipe(map(arr => {
        arr.forEach(el => el.dateOfAppointment = new Date(el.dateOfAppointment));
        return arr;
      }));
  }
  postAppointment(appointmentDTO: AppointmentDTO): Observable<Appointment> {
    return this.http.post<Appointment>(AppComponent.apiUrl + '/appointments', appointmentDTO, AppComponent.headersObject);
  }
  getFreeTermsForGivenDate(date: NgbDate, clinicId: number, doctorId: number): Observable<Time[]> {
    const dateStringForUrl = date.year + '-' + date.month + '-' + date.day;
    return this.http.get<string[]>(AppComponent.apiUrl + '/appointments/free-terms' +
      '?date=' + dateStringForUrl +
      '&clinicId=' + clinicId +
      '&doctorId=' + doctorId, AppComponent.headersObject)
      .pipe(map( res => {
        const mapped = new Array<Time>();
        for (let i = 0; i < res.length; i++) {
          mapped[i] = new Time(res[i]);
        }
        return mapped;
      }));
  }
}
