import {Component} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Doctor} from '../../model/Doctor';
import {AppointmentService} from '../../services/appointment.service';
import {Observable} from 'rxjs';
import {Time} from '../../model/Time';

@Component({
  selector: 'app-appointment-booking-modal',
  templateUrl: './appointment-booking-modal.component.html',
  styleUrls: ['./appointment-booking-modal.component.css']
})
export class AppointmentBookingModalComponent {
  doctor: Doctor;
  clinicId: number;
  freeTerms$: Observable<Time[]>;
  appointmentService: AppointmentService;
  activeModal: NgbActiveModal;
  selectedDate: NgbDate;
  calendar: NgbCalendar;
  config: NgbDatepickerConfig;

  constructor(activeModal: NgbActiveModal, calendar: NgbCalendar, scheduleService: AppointmentService, config: NgbDatepickerConfig) {
    this.activeModal = activeModal;
    this.calendar = calendar;
    this.appointmentService = scheduleService;
    this.config = config;
    const current = new Date();
    this.config.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate() };
  }

  getAvailableTerms(date: NgbDate, clinicId: number, doctorId: number): void {
    console.log({date, clinicId, doctorId});
    this.freeTerms$ = this.appointmentService.getFreeTermsForGivenDate(date, clinicId, doctorId);
  }
}
