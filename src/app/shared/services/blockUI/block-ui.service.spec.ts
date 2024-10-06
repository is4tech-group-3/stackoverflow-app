import { TestBed } from '@angular/core/testing';

import { BlockUIService } from './block-ui.service';

describe('BlockUIService', () => {
  let service: BlockUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
