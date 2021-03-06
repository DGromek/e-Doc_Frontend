import {Component, OnInit} from '@angular/core';
import {faCalendarAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import {NgbDate, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {ClinicService} from '../../services/clinic.service';
import {Observable} from 'rxjs';
import {Clinic} from '../../model/Clinic';
import {map} from 'rxjs/operators';
import {DateTimeUtils} from '../../utils/DateTimeUtils';

@Component({
    selector: 'app-doc-browser',
    templateUrl: './clinics-browser.component.html',
    styleUrls: ['./clinics-browser.component.css'],
})
export class ClinicsBrowserComponent implements OnInit {
    private readonly MONTH_OFFSET = 1;
    faSearch = faSearch;
    faCalendarAlt = faCalendarAlt;
    clinicService: ClinicService;
    clinics$: Observable<Clinic[]>;
    hoveredDate: NgbDate | null = null;
    fromDate: NgbDate;
    toDate: NgbDate | null = null;
    config: NgbDatepickerConfig;

    constructor(clinicService: ClinicService, config: NgbDatepickerConfig) {
        this.clinicService = clinicService;
        this.config = config;
        const current = new Date();
        this.config.minDate = {
            year: current.getFullYear(),
            month: current.getMonth() + this.MONTH_OFFSET,
            day: current.getDate()
        };
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

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }

    isDisabled(date: NgbDate) {
        const current = new Date();
        const currentAsNgbDate = new NgbDate(current.getFullYear(), current.getMonth() + this.MONTH_OFFSET, current.getDate());
        return date.before(currentAsNgbDate);
    }

    datePickerText(): string {
        if (this.fromDate != null && this.toDate != null) {
            return DateTimeUtils.ngbDateAsStringForDisplay(this.fromDate) + ' - ' + DateTimeUtils.ngbDateAsStringForDisplay(this.toDate);
        } else if (this.fromDate != null) {
            return DateTimeUtils.ngbDateAsStringForDisplay(this.fromDate);
        }
        return '';
    }
}
