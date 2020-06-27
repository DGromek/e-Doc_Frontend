import {Component, OnInit} from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {Observable} from 'rxjs';
import {Clinic} from '../../model/Clinic';
import {ActivatedRoute} from '@angular/router';
import {faSearch, faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {DoctorService} from '../../services/doctor.service';
import {Doctor} from '../../model/Doctor';
import {AppointmentBookingModalComponent} from '../appointment-booking-modal/appointment-booking-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html',
  styleUrls: ['./clinic-view.component.css']
})
export class ClinicViewComponent implements OnInit {
  clinicService: ClinicService;
  doctorService: DoctorService;
  modalService: NgbModal;
  route: ActivatedRoute;
  clinic$: Observable<Clinic>;
  doctors$: Observable<Doctor[]>;
  faSearch = faSearch;
  faPhoneAlt = faPhoneAlt;

  constructor(clinicService: ClinicService, doctorService: DoctorService, route: ActivatedRoute, modalService: NgbModal) {
    this.clinicService = clinicService;
    this.doctorService = doctorService;
    this.modalService = modalService;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const clinicId = +params.get('id');
        const speciality = this.route.snapshot.queryParamMap.get('speciality');
        console.log(speciality);
        this.clinic$ = this.clinicService.getClinic(clinicId);
        if (speciality != null) {
          this.doctors$ = this.doctorService.findAllByClinicIdAndDoctorSpeciality(clinicId, speciality);
        } else {
          this.doctors$ = this.doctorService.findAllByClinicId(clinicId);
        }
        // this.clinic$.subscribe(res => console.log(res));
      }
    );
  }

  openModal(doctor: Doctor, clinicId: number) {
    const modalRef = this.modalService.open(AppointmentBookingModalComponent);
    modalRef.componentInstance.doctor = doctor;
    modalRef.componentInstance.clinicId = clinicId;
  }
}
