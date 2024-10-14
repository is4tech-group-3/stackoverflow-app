import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { BlockUIService } from './block-ui.service';

describe('BlockUIService', () => {
  let service: BlockUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [BlockUIService, TranslateService]
    });
    service = TestBed.inject(BlockUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
