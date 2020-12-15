import { Component, OnInit } from '@angular/core';
import {faCalendarAlt, faSearch, faCity, faUserMd, faClinicMedical, faStethoscope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-visit-reserving',
  templateUrl: './visit-reserving.component.html',
  styleUrls: ['./visit-reserving.component.css']
})
export class VisitReservingComponent implements OnInit {
  faSearch = faSearch;
  faCalendarAlt = faCalendarAlt;
  faCity = faCity;
  faUserMd = faUserMd;
  faClinicMedical = faClinicMedical;
  faStethoscope = faStethoscope;
  constructor() { }

  ngOnInit(): void {
  }

}
