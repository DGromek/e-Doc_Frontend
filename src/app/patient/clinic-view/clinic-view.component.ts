import {Component, OnInit} from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {Observable} from 'rxjs';
import {Clinic} from '../../model/Clinic';
import {ActivatedRoute} from '@angular/router';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {DoctorService} from '../../services/doctor.service';
import {DoctorWithDailySchedule} from '../../model/Doctor';
import {Schedule} from '../../model/Schedule';
import {map} from 'rxjs/operators';
import {ScheduleService} from '../../services/schedule.service';

@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html',
  styleUrls: ['./clinic-view.component.css']
})
export class ClinicViewComponent implements OnInit {
  // Services
  clinicService: ClinicService;
  doctorService: DoctorService;
  scheduleService: ScheduleService;
  route: ActivatedRoute;
  clinic$: Observable<Clinic>;
  doctors$: Observable<DoctorWithDailySchedule[]>;
  openingHours$: Observable<Schedule>;
  faPhoneAlt = faPhoneAlt;
  private clinicId: number;
  currentUsedDayOfWeek: number;

  constructor(clinicService: ClinicService, doctorService: DoctorService, scheduleService: ScheduleService, route: ActivatedRoute) {
    this.clinicService = clinicService;
    this.doctorService = doctorService;
    this.scheduleService = scheduleService;
    this.route = route;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.clinicId = +params.get('id');
        this.clinic$ = this.clinicService.getClinic(this.clinicId);
        this.openingHours$ = this.clinicService.getClinicOpeningHours(this.clinicId);
        this.currentUsedDayOfWeek = new Date().getDay();
        this.doctors$ = this.fun();
      }
    );
  }

  getDailySchedules(dayOfWeek: number) {
    this.currentUsedDayOfWeek = dayOfWeek;
    this.doctors$ = this.fun();
  }

  fun(): Observable<DoctorWithDailySchedule[]> {
    return this.doctorService.getAllByClinicId(this.clinicId).pipe(
      map(
        doctors => {
          const result: DoctorWithDailySchedule[] = [];
          for (const doctor of doctors) {
            this.doctorService.getDoctorDailySchedule(this.currentUsedDayOfWeek, this.clinicId, doctor.id).subscribe(doctorSchedule => {
                const doctorWithDailySchedule = new DoctorWithDailySchedule(doctor, doctorSchedule);
                result.push(doctorWithDailySchedule);
              }
            );
          }
          return result;
        }
      )
    );
  }
}
