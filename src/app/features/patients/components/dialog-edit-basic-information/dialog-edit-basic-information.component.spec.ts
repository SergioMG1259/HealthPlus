import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBasicInformationComponent } from './dialog-edit-basic-information.component';

describe('DialogEditBasicInformationComponent', () => {
  let component: DialogEditBasicInformationComponent;
  let fixture: ComponentFixture<DialogEditBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditBasicInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
