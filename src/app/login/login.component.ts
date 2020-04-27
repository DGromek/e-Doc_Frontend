import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Credintials} from '../model/Credintials';
import {PatientService} from '../services/patient.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isError: boolean;
  loginForm: FormGroup;
  credintials: Credintials;
  patientService: PatientService;
  router: Router;
  faUser = faUser;
  faLock = faLock;

  constructor(patientService: PatientService, router: Router) {
    this.patientService = patientService;
    this.router = router;
    this.credintials = new Credintials();
    this.isError = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      pesel: new FormControl(this.credintials.pesel),
      password: new FormControl(this.credintials.password)
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.patientService.login(this.loginForm.value).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this.isError = false;
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.isError = true;
        console.log(error);
      });
  }
}
