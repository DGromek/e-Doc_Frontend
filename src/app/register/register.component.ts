import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import {Patient} from '../model/patient';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  @ViewChild('registerForm', {static : true}) registerForm: NgForm;
  currentId = 1;
  maxId: number;
  patient: Patient;
  constructor() {
    this.patient = new Patient();
  }

  ngOnInit(): void {
    this.carousel.pause();
    this.carousel.showNavigationArrows = false;
    this.carousel.showNavigationIndicators = false;

  }
  ngAfterViewInit(): void {
    this.maxId = this.carousel.slides.length;
  }
  next(): void {
    this.currentId++;
    this.carousel.next();
  }
  prev(): void {
    this.currentId--;
    this.carousel.prev();
  }
  canNotGoFurther(): boolean {
    if (this.currentId === 1) {
      return  false;
    }

    return false;
  }
  canNotSend(): boolean {
    return true;
  }
  get diagnostic() { return JSON.stringify(this.patient); }
}
