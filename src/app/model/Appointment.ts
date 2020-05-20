import {Clinic} from './Clinic';
import {Doctor} from './Doctor';

export class Appointment {
  public dateOfAppointment: Date;
  public doctor: Doctor;
  public clinic: Clinic;
  public status: string;
  constructor() { }
}
