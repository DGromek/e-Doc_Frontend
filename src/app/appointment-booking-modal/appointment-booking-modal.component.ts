import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Doctor} from '../model/Doctor';

@Component({
  selector: 'app-appointment-booking-modal',
  templateUrl: './appointment-booking-modal.component.html',
  styleUrls: ['./appointment-booking-modal.component.css']
})
export class AppointmentBookingModalComponent implements OnInit {
  activeModal: NgbActiveModal;
  doctor: Doctor;
  constructor(activeModal: NgbActiveModal) {
    this.activeModal = activeModal;
  }

  ngOnInit(): void {
  }

}
