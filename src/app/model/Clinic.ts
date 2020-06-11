import {Observable} from 'rxjs';

export class Clinic {
  public id: number;
  public name: string;
  public postalCode: string;
  public city: string;
  public street: string;
  public houseNr: string;
  public flatNr: string;
  public phoneNumber: string;
  public specialities: string[];
  constructor() {
  }
}
