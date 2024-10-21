import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { AnswersUserComponent } from './answers-user.component';
import { QuestionService } from '../../service/question/question.service'; 

describe('AnswersUserComponent', () => {
  let component: AnswersUserComponent;
  let fixture: ComponentFixture<AnswersUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        MatDialogModule 
      ],
      declarations: [AnswersUserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ idQuestion: 1 })
          }
        },
        QuestionService
      ]
    });
    fixture = TestBed.createComponent(AnswersUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
