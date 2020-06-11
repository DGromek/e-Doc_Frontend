import {Component, OnInit} from '@angular/core';
import {faSearch, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ClinicService} from '../services/clinic.service';
import {Observable, of} from 'rxjs';
import {Clinic} from '../model/Clinic';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-doc-browser',
  templateUrl: './doc-browser.component.html',
  styleUrls: ['./doc-browser.component.css']
})
export class DocBrowserComponent implements OnInit {
  faSearch = faSearch;
  faCalendarAlt = faCalendarAlt;
  model: NgbDateStruct;
  clinicService: ClinicService;
  clinics$: Observable<Clinic[]>;
  clinics: Clinic[];

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
          console.log(clinics);
          return clinics;
        }
      )
    );
  }
}
