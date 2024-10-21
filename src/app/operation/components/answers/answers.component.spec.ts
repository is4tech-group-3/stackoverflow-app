import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AnswersComponent } from './answers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionService } from '../../service/question/question.service';

describe('AnswersComponent', () => {
  let component: AnswersComponent;
  let fixture: ComponentFixture<AnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AnswersComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ idQuestion: 1 }) // Asegúrate de usar el nombre correcto del parámetro
          }
        },
        QuestionService
      ]
    });
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
