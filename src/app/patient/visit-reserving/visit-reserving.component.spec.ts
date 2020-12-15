import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitReservingComponent } from './visit-reserving.component';

describe('VisitReservingComponent', () => {
  let component: VisitReservingComponent;
  let fixture: ComponentFixture<VisitReservingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitReservingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitReservingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
