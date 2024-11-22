import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletePatientComponent } from './dialog-delete-patient.component';

describe('DialogDeletePatientComponent', () => {
  let component: DialogDeletePatientComponent;
  let fixture: ComponentFixture<DialogDeletePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeletePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeletePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
