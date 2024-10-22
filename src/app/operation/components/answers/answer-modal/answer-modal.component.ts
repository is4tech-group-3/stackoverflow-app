import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as SimpleMDE from 'simplemde';
import { marked } from 'marked';
import { TranslateService } from '@ngx-translate/core';
import { AnswerService } from '../../../service/answer/answer.service';

@Component({
  selector: 'app-answer-modal',
  templateUrl: './answer-modal.component.html',
  styleUrls: ['./answer-modal.component.scss']
})
export class AnswerModalComponent implements OnInit {
  answer: string = '';
  answers: any[] = [];
  simpleMDE: SimpleMDE | undefined;

  @ViewChild('mdeEditor', { static: true }) mdeEditor!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<AnswerModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { idQuestion: number; idAnswer?: number },
    private translate: TranslateService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    if (this.data.idAnswer) {
      this.loadAnswerData(this.data.idAnswer);
    } else {
      this.initializeEditor();
    }
  }

  loadAnswerData(idAnswer: number): void {
    this.answerService.getAnswerById(idAnswer).subscribe({
      next: data => {
        this.answer = data.description;
        this.initializeEditor();
      },
      error: err => {
        console.error('Error al cargar los datos de la respuesta:', err);
      }
    });
  }

  getAnswers(idQuestion: number): void {
    this.answerService.getAnswersByQuestion(idQuestion).subscribe(
      data => {
        console.log('Respuestas obtenidas:', data);
        this.answers = data.content;
      },
      error => {
        console.error('Error al obtener respuestas', error);
      }
    );
  }

  initializeEditor() {
    this.translate
      .get('input.answerDescription.placeholder')
      .subscribe(placeholder => {
        this.simpleMDE = new SimpleMDE({
          element: this.mdeEditor.nativeElement,
          initialValue: this.answer,
          placeholder: placeholder,
          toolbar: [
            'bold',
            'italic',
            '|',
            'link',
            'quote',
            {
              name: 'code',
              action: SimpleMDE.toggleCodeBlock,
              className: 'fa fa-code',
              title: 'Insertar código'
            },
            '|',
            'ordered-list',
            'unordered-list',
            'horizontal-rule',
            '|',
            'undo',
            'redo'
          ],
          autosave: {
            enabled: false,
            uniqueId: 'answerEditor'
          },
          renderingConfig: {
            codeSyntaxHighlighting: true
          },
          status: false
        });
        this.simpleMDE.codemirror.setSize('100%', '200px');
        this.simpleMDE.codemirror.getWrapperElement().style.minHeight = '200px';

        this.simpleMDE.codemirror.on('change', () => {
          this.answer = this.simpleMDE?.value() || '';
        });
      });
  }

  saveAnswer(): void {
    const answerData = {
      description: marked(this.answer),
      idQuestion: this.data.idQuestion
    };

    if (this.data.idAnswer) {
      this.answerService
        .updateAnswer(this.data.idAnswer, answerData)
        .subscribe({
          next: () => {
            console.log('Respuesta editada exitosamente');
            this.dialogRef.close(true);
          },
          error: err => {
            console.error('Error al actualizar la respuesta:', err);
          }
        });
    } else {
      this.answerService
        .createAnswer(this.data.idQuestion, answerData)
        .subscribe({
          next: () => {
            console.log('Nueva respuesta creada exitosamente');
            this.dialogRef.close(true);
            window.location.reload();
          },
          error: err => {
            console.error('Error al crear la respuesta:', err);
          }
        });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
