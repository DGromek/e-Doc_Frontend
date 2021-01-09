export class Schedule {
  public id: number;

  public moBegin: string;
  public moEnd: string;

  public tuBegin: string;
  public tuEnd: string;

  public weBegin: string;
  public weEnd: string;

  public thBegin: string;
  public thEnd: string;

  public frBegin: string;
  public frEnd: string;

  public saBegin: string;
  public saEnd: string;

  public suBegin: string;
  public suEnd: string;
}

export class DailySchedule {
  public startingHour: string;
  public endingHour: string;
}
