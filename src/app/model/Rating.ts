import {Patient} from './Patient';
import {Observable} from 'rxjs';

export class Rating {
  id: number;
  patient: Observable<Patient>;
  rate: number;
  description: string;
  constructor() {
  }
}
