import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetsCalendarComponent } from './meets-calendar.component';

describe('MeetsCalendarComponent', () => {
  let component: MeetsCalendarComponent;
  let fixture: ComponentFixture<MeetsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetsCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
