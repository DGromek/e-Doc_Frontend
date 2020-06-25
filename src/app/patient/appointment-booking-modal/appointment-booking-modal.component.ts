import {Component} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Doctor} from '../../model/Doctor';
import {AppointmentService} from '../../services/appointment.service';
import {Observable} from 'rxjs';
import {Time} from '../../model/Time';
import {AppointmentDTO} from '../../model/AppointmentDTO';

@Component({
  selector: 'app-appointment-booking-modal',
  templateUrl: './appointment-booking-modal.component.html',
  styleUrls: ['./appointment-booking-modal.component.css']
})
export class AppointmentBookingModalComponent {
  // Data
  doctor: Doctor;
  clinicId: number;
  selectedTerm: Time;
  freeTerms$: Observable<Time[]>;
  // Service
  appointmentService: AppointmentService;
  // Components
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
    this.config.minDate = {year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()};
  }

  getAvailableTerms(): void {
    this.freeTerms$ = this.appointmentService.getFreeTermsForGivenDate(this.selectedDate, this.clinicId, this.doctor.id);
  }

  makeReservation() {
    const dateOfReservation = new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day,
      this.selectedTerm.hours, this.selectedTerm.minutes);
    const appointmentDTO = new AppointmentDTO(dateOfReservation, this.clinicId, this.doctor.id);
    this.appointmentService.postAppointment(appointmentDTO).subscribe(res => console.log(res));
  }
}
