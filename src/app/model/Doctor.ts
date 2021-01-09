import {DailySchedule} from './Schedule';

export class Doctor {
  public id: number;
  public firstName: string;
  public lastName: string;
  public speciality: string;

  constructor() {
  }
}

export class DoctorWithDailySchedule {
  public doctor: Doctor;
  public dailySchedule: DailySchedule;
  constructor(doctor: Doctor, dailySchedule: DailySchedule) {
    this.doctor = doctor;
    this.dailySchedule = dailySchedule;
  }
}
