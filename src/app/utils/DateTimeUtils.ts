import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class DateTimeUtils {
  public static ngbDateAsStringForDisplay(date: NgbDate): string {
    return ('0' + date.day).slice(-2) + '-' + ('0' + date.month).slice(-2) + '-' + date.year;
  }

  public static ngbDateAsStringISO(date: NgbDate): string {
    return date.year + '-' + ('0' + date.month).slice(-2) + '-' + ('0' + date.day).slice(-2);
  }
}
