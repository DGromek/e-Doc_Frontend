export class AppointmentDTO {
  dateOfAppointment: Date;
  clinicId: number;
  doctorId: number;

  constructor(dateOfAppointment: Date, clinicId: number, doctorId: number) {
    this.dateOfAppointment = dateOfAppointment;
    this.clinicId = clinicId;
    this.doctorId = doctorId;
  }
}
