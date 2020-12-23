import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTemplateComponent } from './appointment-template.component';

describe('AppointmentTemplateComponent', () => {
  let component: AppointmentTemplateComponent;
  let fixture: ComponentFixture<AppointmentTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
