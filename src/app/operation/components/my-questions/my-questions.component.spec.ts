import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { MyQuestionsComponent } from './my-questions.component';
import { QuestionService } from '../../service/question/question.service'; 

describe('MyQuestionsComponent', () => {
  let component: MyQuestionsComponent;
  let fixture: ComponentFixture<MyQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [MyQuestionsComponent],
      providers: [QuestionService] 
    });
    fixture = TestBed.createComponent(MyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
