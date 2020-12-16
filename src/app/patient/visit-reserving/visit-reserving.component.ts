import { Component, OnInit } from '@angular/core';
import {faCalendarAlt, faCity, faUserMd, faClinicMedical, faStethoscope} from '@fortawesome/free-solid-svg-icons';
import {FilterService} from '../../services/filter.service';
import {Observable} from 'rxjs';
import {NgbDate, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visit-reserving',
  templateUrl: './visit-reserving.component.html',
  styleUrls: ['./visit-reserving.component.css']
})
export class VisitReservingComponent implements OnInit {
  // Service
  filterService: FilterService;
  // Data
  cities$: Observable<string[]>;
  clinicNames$: Observable<string[]>;
  specialities$: Observable<string[]>;
  doctorsNames$: Observable<string[]>;
  // Icons
  faCalendarAlt = faCalendarAlt;
  faCity = faCity;
  faUserMd = faUserMd;
  faClinicMedical = faClinicMedical;
  faStethoscope = faStethoscope;
  // Calendar properties
  date: NgbDate;
  config: NgbDatepickerConfig;
  constructor(filterService: FilterService, config: NgbDatepickerConfig) {
    this.filterService = filterService;
    this.config = config;
    const current = new Date();
    this.config.minDate = {year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()};
  }

  ngOnInit(): void {
    this.cities$ = this.filterService.getCities();
    this.clinicNames$ = this.filterService.getClinicNames();
    this.specialities$ = this.filterService.getSpecialities();
    this.doctorsNames$ = this.filterService.getDoctorsNames();
  }
}
