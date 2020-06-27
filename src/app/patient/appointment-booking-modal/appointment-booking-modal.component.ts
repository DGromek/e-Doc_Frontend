import {Component} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Doctor} from '../../model/Doctor';
import {AppointmentService} from '../../services/appointment.service';
import {Observable} from 'rxjs';
import {Time} from '../../model/Time';
import {AppointmentDTO} from '../../model/AppointmentDTO';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

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
  isReservationFinished = false;
  // Service
  appointmentService: AppointmentService;
  // Components
  activeModal: NgbActiveModal;
  selectedDate: NgbDate;
  calendar: NgbCalendar;
  config: NgbDatepickerConfig;
  // Icon
  faCheckCircle = faCheckCircle;

  constructor(activeModal: NgbActiveModal, calendar: NgbCalendar, scheduleService: AppointmentService, config: NgbDatepickerConfig) {
    this.activeModal = activeModal;
    this.calendar = calendar;
    this.appointmentService = scheduleService;
    this.config = config;
    const current = new Date();
    this.config.minDate = {year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()};
  }

  getAvailableTerms(): void {
    this.selectedTerm = null;
    this.freeTerms$ = this.appointmentService.getFreeTermsForGivenDate(this.selectedDate, this.clinicId, this.doctor.id);
  }

  makeReservation() {
    const MONTH_OFFSET = 1; // As TypeScript date is indexing months since 0 not 1 like any other normal language LOL.
    const dateOfReservation = new Date(this.selectedDate.year, this.selectedDate.month - MONTH_OFFSET, this.selectedDate.day,
      this.selectedTerm.hours, this.selectedTerm.minutes);
    const appointmentDTO = new AppointmentDTO(dateOfReservation, this.clinicId, this.doctor.id);
    this.appointmentService.postAppointment(appointmentDTO).subscribe(() => {
      this.isReservationFinished = true;
    });
  }

  selectTerm(event: Event, term: Time) {
    const previouslyChosenButton: HTMLCollectionOf<Element> = document.getElementsByClassName('selected');
    if (previouslyChosenButton.item(0) != null) {
      previouslyChosenButton.item(0).classList.remove('selected');
    }
    const chosenButton: Element = (event.target as Element);
    chosenButton.classList.add('selected');
    this.selectedTerm = term;
  }
}
