import { Component, OnInit } from '@angular/core';
import {ClinicService} from '../services/clinic.service';
import {Observable} from 'rxjs';
import {Clinic} from '../model/Clinic';
import {ActivatedRoute} from '@angular/router';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html',
  styleUrls: ['./clinic-view.component.css']
})
export class ClinicViewComponent implements OnInit {
  clinicService: ClinicService;
  route: ActivatedRoute;
  clinic$: Observable<Clinic>;
  faSearch = faSearch;
  constructor(clinicService: ClinicService, route: ActivatedRoute) {
    this.clinicService = clinicService;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.clinic$ = this.clinicService.getClinic(+params.get('id'));
        // this.clinic$.subscribe(res => console.log(res));
      }
    );
  }

}
