import {Component, OnInit} from '@angular/core';
import {faCalendarAlt, faCity, faUserMd, faClinicMedical, faStethoscope} from '@fortawesome/free-solid-svg-icons';
import {FilterService} from '../../services/filter.service';
import {Observable} from 'rxjs';
import {NgbDate, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../model/Appointment';
import {AppointmentService} from '../../services/appointment.service';

@Component({
  selector: 'app-visit-reserving',
  templateUrl: './visit-reserving.component.html',
  styleUrls: ['./visit-reserving.component.css']
})
export class VisitReservingComponent implements OnInit {
  // Services
  filterService: FilterService;
  appointmentService: AppointmentService;
  // Data
  cities$: Observable<string[]>;
  clinicsNames$: Observable<string[]>;
  specialities$: Observable<string[]>;
  doctorsNames$: Observable<string[]>;
  freeTerms$: Observable<Appointment[]>;
  // Icons
  faCalendarAlt = faCalendarAlt;
  faCity = faCity;
  faUserMd = faUserMd;
  faClinicMedical = faClinicMedical;
  faStethoscope = faStethoscope;
  // Calendar properties
  date: NgbDate;
  config: NgbDatepickerConfig;
  // Selected filters
  public selectedCity: string;
  public selectedSpeciality: string;
  public selectedClinic: string;
  public selectedDoctor: string;

  constructor(filterService: FilterService, appointmentsService: AppointmentService, config: NgbDatepickerConfig) {
    this.filterService = filterService;
    this.appointmentService = appointmentsService;
    this.config = config;
    const current = new Date();
    this.config.minDate = {year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()};

    this.selectedClinic = null;
    this.selectedDoctor = null;
    this.selectedSpeciality = null;
    this.selectedCity = null;
  }

  ngOnInit(): void {
    this.cities$ = this.filterService.getCities();
    this.specialities$ = this.filterService.getSpecialities();

  }

  onCitySelect(): void {
    this.selectedClinic = null;
    this.selectedDoctor = null;
    this.clinicsNames$ = this.filterService.getClinicNames(this.selectedCity, this.selectedDoctor);
    if (this.selectedSpeciality != null) {
      this.doctorsNames$ = this.filterService.getDoctorsNames(this.selectedCity, this.selectedSpeciality, this.selectedClinic);
    }
  }

  onSpecialtySelect(): void {
    if (this.selectedDoctor != null) {
      this.selectedDoctor = null;
      this.onDoctorSelect();
    }
    if (this.selectedCity != null) {
        this.doctorsNames$ = this.filterService.getDoctorsNames(this.selectedCity, this.selectedSpeciality, this.selectedClinic);
    }
  }

  onDoctorSelect(): void {
    this.clinicsNames$ = this.filterService.getClinicNames(this.selectedCity, this.selectedDoctor);
  }

  onClinicSelect(): void {
    this.doctorsNames$ = this.filterService.getDoctorsNames(this.selectedCity, this.selectedSpeciality, this.selectedClinic);
  }

  canSubmit(): boolean {
    return this.date != null && this.selectedCity != null && this.selectedSpeciality != null;
  }

  getFreeAppointments(): void {
    this.freeTerms$ = this.appointmentService.getFreeAppointments(this.date, this.selectedCity, this.selectedSpeciality,
      this.selectedClinic, this.selectedDoctor);
  }
}
