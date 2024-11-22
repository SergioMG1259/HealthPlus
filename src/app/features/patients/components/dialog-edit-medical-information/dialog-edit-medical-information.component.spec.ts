import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMedicalInformationComponent } from './dialog-edit-medical-information.component';

describe('DialogEditMedicalInformationComponent', () => {
  let component: DialogEditMedicalInformationComponent;
  let fixture: ComponentFixture<DialogEditMedicalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditMedicalInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditMedicalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
