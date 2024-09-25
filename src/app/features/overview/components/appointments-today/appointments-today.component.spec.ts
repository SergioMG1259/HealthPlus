import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsTodayComponent } from './appointments-today.component';

describe('AppointmentsTodayComponent', () => {
  let component: AppointmentsTodayComponent;
  let fixture: ComponentFixture<AppointmentsTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
