import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../model/Appointment';
import {AppointmentDTO} from '../../model/AppointmentDTO';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {AppointmentService} from '../../services/appointment.service';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appointment-template',
  templateUrl: './appointment-template.component.html',
  styleUrls: ['./appointment-template.component.css']
})
export class AppointmentTemplateComponent implements OnInit {
  @Input() appointment: Appointment;
  private appointmentService: AppointmentService;
  faCheckCircle = faCheckCircle;
  modalService: NgbModal;
  constructor(appointmentService: AppointmentService, modalService: NgbModal) {
    this.appointmentService = appointmentService;
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

}
