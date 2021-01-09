import { Component, OnInit } from '@angular/core';
import { faUserCircle, faFilter, faCalendar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faUserCircle = faUserCircle;
  faFilter = faFilter;
  faCalendar = faCalendar;

  constructor() { }

  ngOnInit(): void {
  }

}
