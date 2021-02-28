import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {Appointment} from '../../model/Appointment';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {RatingService} from "../../services/rating.service";

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  appointmentService: AppointmentService;
  appointments$: Observable<Appointment[]>;
  private readonly ratingService: RatingService;

  constructor(appointmentService: AppointmentService, ratingService: RatingService) {
    this.appointmentService = appointmentService;
    this.ratingService = ratingService;
  }

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAppointments()
      .pipe(
        map(appointments => {
          for (const appointment of appointments) {
            if (appointment.status === 'DONE') {
              this.ratingService.getRating(appointment.id).subscribe( rating => appointment.rating = rating);
            }
          }
          return appointments;
        }));
  }

}
