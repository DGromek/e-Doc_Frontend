import {Clinic} from './Clinic';
import {Doctor} from './Doctor';
import {Rating} from './Rating';

export class Appointment {
  public id: number;
  public dateOfAppointment: Date;
  public doctor: Doctor;
  public clinic: Clinic;
  public status: string;
  public rating: Rating;
  constructor() { }
}
