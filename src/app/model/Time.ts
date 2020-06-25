export class Time {
  hours: number;
  minutes: number;


  constructor(timeInString: string) {
    const timeInStringSplited = timeInString.split(':');
    this.hours = +timeInStringSplited[0];
    this.minutes = +timeInStringSplited[1];
  }
}
