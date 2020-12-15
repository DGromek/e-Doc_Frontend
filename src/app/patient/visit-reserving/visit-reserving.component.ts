import { Component, OnInit } from '@angular/core';
import {faCalendarAlt, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-visit-reserving',
  templateUrl: './visit-reserving.component.html',
  styleUrls: ['./visit-reserving.component.css']
})
export class VisitReservingComponent implements OnInit {
  faSearch = faSearch;
  faCalendarAlt = faCalendarAlt;
  constructor() { }

  ngOnInit(): void {
  }

}
