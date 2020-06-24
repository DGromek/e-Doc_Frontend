import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppComponent} from '../app.component';
import {Appointment} from '../model/Appointment';
import {map} from 'rxjs/operators';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

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
  getFreeTermsForGivenDate(date: NgbDate, doctorId: number, clinicId: number): void {
    const dateStringForUrl = date.year + '-' + date.month + '-' + date.day;
    // const dateStringForUrl = '2020-06-24';
    this.http.get<any>(AppComponent.apiUrl + '/appointments/free-terms' +
      '?date=' + dateStringForUrl +
      '&doctorId=' + doctorId +
      '&clinicId=' + clinicId, AppComponent.headersObject).subscribe(res => console.log(res));
  }
}
