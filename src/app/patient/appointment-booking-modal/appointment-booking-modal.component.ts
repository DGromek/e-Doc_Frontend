import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Doctor} from '../../model/Doctor';
import {AppointmentService} from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-booking-modal',
  templateUrl: './appointment-booking-modal.component.html',
  styleUrls: ['./appointment-booking-modal.component.css']
})
export class AppointmentBookingModalComponent implements OnInit {
  doctor: Doctor;
  activeModal: NgbActiveModal;
  selectedDate: NgbDate;
  calendar: NgbCalendar;
  appointmentService: AppointmentService;
  clinicId: number;

  constructor(activeModal: NgbActiveModal, calendar: NgbCalendar, scheduleService: AppointmentService) {
    this.activeModal = activeModal;
    this.calendar = calendar;
    this.appointmentService = scheduleService;
  }

  ngOnInit(): void {
  }

  getAvailableTerms(date: NgbDate, doctorId: number, clinicId: number): void {
    console.log({date, doctorId, clinicId});
    this.appointmentService.getFreeTermsForGivenDate(date, doctorId, clinicId);
    // this.scheduleService.getFreeTermsForGivenDate(dayOfTheWeek, doctorId, clinicId).pipe(map(
    //   res => {
    //     console.log(res);
    //     console.log(typeof res.endingHour);
    //     res.startingHour = new Time(res.startingHour[0], res.startingHour[1]);
    //     res.endingHour = new Time(res.endingHour[0], res.endingHour[1]);
    //     const result = new Array<Time>();
    //     let j = 0;
    //     for (let i = res.startingHour; i.isBefore(res.endingHour); i.addMinutes(30)) {
    //       result[j++] = i;
    //     }
    //     return result;
    //   })).subscribe(res => console.log(res));
  }
}
