import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookingModalComponent } from './appointment-booking-modal.component';

describe('AppointmentBookingModalComponent', () => {
  let component: AppointmentBookingModalComponent;
  let fixture: ComponentFixture<AppointmentBookingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentBookingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
