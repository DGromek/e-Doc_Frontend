import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../model/Appointment';
import {AppointmentDTO} from '../../model/AppointmentDTO';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AppointmentService} from '../../services/appointment.service';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {RatingService} from '../../services/rating.service';
import {RatingDTO} from "../../model/RatingDTO";

@Component({
  selector: 'app-appointment-template',
  templateUrl: './appointment-template.component.html',
  styleUrls: ['./appointment-template.component.css']
})
export class AppointmentTemplateComponent implements OnInit {
  @Input() appointment: Appointment;
  private appointmentService: AppointmentService;
  private ratingService: RatingService;
  ratingRate: number;
  ratingDesc: string;
  ratingAppointmentId: number;
  faCheckCircle = faCheckCircle;
  modalService: NgbModal;
  constructor(appointmentService: AppointmentService, modalService: NgbModal, ratingService: RatingService) {
    this.appointmentService = appointmentService;
    this.ratingService = ratingService;
    this.modalService = modalService;
  }

  ngOnInit(): void {
  }

  onReservationButtonClick(content): void {
    const appointmentDTO = new AppointmentDTO(this.appointment.dateOfAppointment, this.appointment.clinic.id, this.appointment.doctor.id);
    console.log(appointmentDTO);
    this.appointmentService.postAppointment(appointmentDTO).subscribe(
      () => {
        const ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
        };
        this.modalService.open(content, ngbModalOptions);
      }
    );
  }

  onAddRatingButtonClick(modalId, appointmentId) {
    this.modalService.open(modalId);
    this.ratingAppointmentId = appointmentId;
  }
  addRatingSubmit() {
    const ratingDto = new RatingDTO();
    ratingDto.appointmentId = this.ratingAppointmentId;
    ratingDto.rate = this.ratingRate;
    ratingDto.description = this.ratingDesc;
    this.ratingService.addRating(ratingDto);
  }
}
