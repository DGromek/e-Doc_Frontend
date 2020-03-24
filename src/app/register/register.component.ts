import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {Patient} from '../model/patient';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;
  registerForm: FormGroup;
  currentId = 1;
  readonly maxId = 3;
  patient: Patient;

  constructor() {
    this.patient = new Patient();
  }

  ngOnInit(): void {
    this.carousel.pause();
    this.carousel.showNavigationArrows = false;
    this.carousel.showNavigationIndicators = false;

    this.registerForm = new FormGroup({
      pesel: new FormControl(this.patient.pesel, [
        Validators.required,
        Validators.pattern('\\d{11}')
      ]),
      firstName: new FormControl(this.patient.firstName, [
        Validators.required
      ]),
      lastName: new FormControl(this.patient.lastName, [
        Validators.required
      ]),
      city: new FormControl(this.patient.city, [
        Validators.required,
      ]),
      street: new FormControl(this.patient.street, [
        Validators.required,
      ]),
      houseNr: new FormControl(this.patient.houseNr, [
        Validators.required,
      ]),
      postalCode: new FormControl(this.patient.postalCode, [
        Validators.required,
        Validators.pattern('\\d{2}-\\d{3}')
      ]),
      email: new FormControl(this.patient.email, [
        Validators.email
      ]),
      phoneNr : new FormControl(this.patient.phoneNr),
      approval : new FormControl(this.patient.approval, [
        Validators.requiredTrue
      ])
    });
  }

  ngAfterViewInit(): void {
    // this.maxId = this.carousel.slides.length; Makes application laggy
  }

  next(): void {
    this.currentId++;
    this.carousel.next();
  }

  prev(): void {
    this.currentId--;
    this.carousel.prev();
  }

  canGoFurther(): boolean {
    if (this.currentId === 1 && (this.pesel.invalid || this.firstName.invalid || this.lastName.invalid)) {
      return false;
    } else if (this.currentId === 2 && (this.city.invalid || this.street.invalid || this.houseNr.invalid || this.postalCode.invalid)) {
      return false;
    } else {
      return true;
    }
  }

  canSend(): boolean {
    if (this.currentId === 3 && this.approval.invalid) {
      return false;
    }
    return true;
  }

  get diagnostic() {
    return JSON.stringify(this.patient);
  }

  get pesel() {
    return this.registerForm.get('pesel');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get city() {
    return this.registerForm.get('city');
  }

  get street() {
    return this.registerForm.get('street');
  }

  get houseNr() {
    return this.registerForm.get('houseNr');
  }

  get postalCode() {
    return this.registerForm.get('postalCode');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get approval() {
    return this.registerForm.get('approval');
  }
}
