import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbDatepicker, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Doctor} from '../../model/Doctor';
import {AppointmentService} from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-booking-modal',
  templateUrl: './appointment-booking-modal.component.html',
  styleUrls: ['./appointment-booking-modal.component.css']
})
export class AppointmentBookingModalComponent {
  doctor: Doctor;
  clinicId: number;
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

  getAvailableTerms(date: NgbDate, doctorId: number, clinicId: number): void {
    console.log({date, doctorId, clinicId});
    this.appointmentService.getFreeTermsForGivenDate(date, doctorId, clinicId);
  }
}
