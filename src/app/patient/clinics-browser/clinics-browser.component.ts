import {Component, OnInit} from '@angular/core';
import {faSearch, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ClinicService} from '../../services/clinic.service';
import {Observable} from 'rxjs';
import {Clinic} from '../../model/Clinic';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-doc-browser',
  templateUrl: './clinics-browser.component.html',
  styleUrls: ['./clinics-browser.component.css']
})
export class ClinicsBrowserComponent implements OnInit {
  faSearch = faSearch;
  faCalendarAlt = faCalendarAlt;
  model: NgbDateStruct;
  clinicService: ClinicService;
  clinics$: Observable<Clinic[]>;
  constructor(clinicService: ClinicService) {
    this.clinicService = clinicService;
  }

  ngOnInit(): void {
    this.clinics$ = this.clinicService.getClinics().pipe(
      map(
        clinics => {
          for (const clinic of clinics) {
            this.clinicService.getClinicSpecialists(clinic.id).subscribe(specialities => clinic.specialities = specialities);
          }
          return clinics;
        }
      )
    );
  }
}
