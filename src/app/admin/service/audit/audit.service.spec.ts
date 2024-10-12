/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuditService } from './audit.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Audit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([AuditService], (service: AuditService) => {
    expect(service).toBeTruthy();
  }));
});
