import {Component, OnInit} from '@angular/core';

import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Credintials} from '../model/Credintials';
import {PatientService} from '../services/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  loginForm: FormGroup;
  credintials: Credintials;
  patientService: PatientService;

  constructor(patientService: PatientService) {
    this.patientService = patientService;
    this.credintials = new Credintials();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      pesel: new FormControl(this.credintials.pesel),
      password: new FormControl(this.credintials.password)
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.patientService.login(this.loginForm.value);
  }
}
