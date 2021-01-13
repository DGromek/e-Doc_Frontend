import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Doctor} from '../../model/Doctor';
import {Rating} from '../../model/Rating';
import {map} from 'rxjs/operators';
import {PatientService} from '../../services/patient.service';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit {
  doctorService: DoctorService;
  route: ActivatedRoute;
  doctorId: number;
  doctor$: Observable<Doctor>;
  ratings$: Observable<Rating[]>;
  private patientService: PatientService;
  constructor(doctorService: DoctorService, patientService: PatientService, route: ActivatedRoute) {
    this.doctorService = doctorService;
    this.patientService = patientService;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.doctorId = +params.get('id');
        this.doctor$ = this.doctorService.getDoctorById(this.doctorId);
        this.ratings$ = this.doctorService.getDoctorRatings(this.doctorId)
          .pipe( map( ratings => {
            for (const rating of ratings) {
              rating.patient = this.patientService.getPatientByAppointmentId(rating.id);
            }
            return ratings;
          }));
      }
    );
  }

}
