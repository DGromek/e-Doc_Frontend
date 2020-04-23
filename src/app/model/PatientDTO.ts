import {Patient} from './Patient';

export class PatientDTO {
  public pesel: string;
  public firstName: string;
  public lastName: string;
  public city: string;
  public street: string;
  public houseNr: string;
  public postalCode: string;
  public password: string;
  public phoneNr: string;
  public email: string;
  constructor(patient: Patient) {
    this.pesel = patient.pesel;
    this.firstName = patient.firstName;
    this.lastName = patient.lastName;
    this.password = patient.password;
    this.city = patient.city;
    this.postalCode = patient.postalCode;
    this.street = patient.street;
    this.houseNr = patient.houseNr;
    this.email = patient.email;
    this.phoneNr = patient.phoneNr;
  }
}
