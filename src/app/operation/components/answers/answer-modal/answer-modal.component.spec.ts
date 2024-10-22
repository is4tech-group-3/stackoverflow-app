import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { AnswerModalComponent } from './answer-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AnswerModalComponent', () => {
  let component: AnswerModalComponent;
  let fixture: ComponentFixture<AnswerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(), // Asegúrate de que esto esté aquí
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [AnswerModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: TranslateService,
          useValue: {
            instant: (key: string) => key,
            get: () =>
              of({
                'answer.title': 'Título de la respuesta',
                'answer.description': 'Descripción de la respuesta'
              }),
            onLangChange: of()
          }
        }
      ]
    });
    fixture = TestBed.createComponent(AnswerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
