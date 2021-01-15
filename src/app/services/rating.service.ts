import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Rating} from '../model/Rating';
import {environment} from '../../environments/environment';
import {AppComponent} from '../app.component';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getRating(appointmentId: number): Observable<Rating> {
    return this.http.get<Rating>(environment.apiUrl + '/ratings?appointmentId=' + appointmentId, AppComponent.headersObject).pipe(
      map( singleElementList => {
        return singleElementList[0];
      })
    );
  }
  getDoctorRatings(doctorId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(environment.apiUrl + '/ratings?doctorId=' + doctorId, AppComponent.headersObject);
  }
}
