import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AnswerLikeService } from './answer-like.service';

describe('AnswerLikeService', () => {
  let service: AnswerLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AnswerLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
