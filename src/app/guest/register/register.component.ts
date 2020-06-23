import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {Patient} from '../../model/Patient';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {PatientService} from '../../services/patient.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;
  registerForm: FormGroup;
  currentId = 1;
  readonly maxId = 4;
  patient: Patient;
  patientService: PatientService;
  passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeatedPassword = control.get('repeatedPassword');
    return password.value !== repeatedPassword.value ? { 'passwordMatch': true } : null;
  };
  constructor(patientService: PatientService) {
    this.patient = new Patient();
    this.patientService = patientService;
  }

  ngOnInit(): void {
    this.carousel.pause();
    this.carousel.showNavigationArrows = false;
    this.carousel.showNavigationIndicators = false;

    this.registerForm = new FormGroup({
      pesel: new FormControl(this.patient.pesel, [
        Validators.required,
        Validators.pattern('\\d{4}[0-3]{1}\\d{1}\\d{5}')
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
      password: new FormControl(this.patient.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
      repeatedPassword: new FormControl(this.patient.repeatedPassword, [
      ]),
      email: new FormControl(this.patient.email, [
        Validators.email
      ]),
      phoneNr: new FormControl(this.patient.phoneNr),
      approval: new FormControl(this.patient.approval, [
        Validators.requiredTrue
      ])
    }, {validators : this.passwordMatchValidator});
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
    } else if (this.currentId === 3 && (this.password.invalid || this.registerForm.errors?.passwordMatch)) {
      return false;
    } else {
      return true;
    }
  }

  canSubmit(): boolean {
    if (this.currentId === 4 && this.approval.invalid) {
      return false;
    }
    return true;
  }
  onSubmit() {
    this.patientService.addPatient(this.registerForm.value).subscribe();
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

  get password() {
    return this.registerForm.get('password');
  }

  get repeatedPassword() {
    return this.registerForm.get('repeatedPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get approval() {
    return this.registerForm.get('approval');
  }

}
