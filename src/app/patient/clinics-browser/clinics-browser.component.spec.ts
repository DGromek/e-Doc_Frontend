import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsBrowserComponent } from './clinics-browser.component';

describe('DocBrowserComponent', () => {
  let component: ClinicsBrowserComponent;
  let fixture: ComponentFixture<ClinicsBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicsBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
