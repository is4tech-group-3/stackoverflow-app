import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormErrorService } from './form-error.service';

describe('FormErrorService', () => {
  let service: FormErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot()  
      ],
      providers: [TranslateService]
    });
    service = TestBed.inject(FormErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
