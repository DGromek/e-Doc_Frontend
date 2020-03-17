import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  currentId = 1;
  readonly maxId = 3;
  constructor() {
  }

  ngOnInit(): void {
    this.carousel.pause();
    this.carousel.showNavigationArrows = false;
    this.carousel.showNavigationIndicators = false;
  }
  next() {
    this.currentId++;
    this.carousel.next();
  }
  prev() {
    this.currentId--;
    this.carousel.prev();
  }
}
