/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PublicationService } from './publication.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Publication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PublicationService]
    });
  });

  it('should ...', inject([PublicationService], (service: PublicationService) => {
    expect(service).toBeTruthy();
  }));
});
