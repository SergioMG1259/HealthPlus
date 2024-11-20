import { TestBed } from '@angular/core/testing';

import { AppointmentDetailService } from './appointment-detail.service';

describe('AppointmentDetailService', () => {
  let service: AppointmentDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
