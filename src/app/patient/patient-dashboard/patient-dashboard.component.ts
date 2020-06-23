import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {Appointment} from '../../model/Appointment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  appointmentService: AppointmentService;
  appointments$: Observable<Appointment[]>;
  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAppointments();
  }

}
