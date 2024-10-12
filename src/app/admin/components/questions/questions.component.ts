import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionModalComponent } from './question-modal/question-modal.component';
import { QuestionService } from '../../service/question.service';
import { TagService } from '../../service/tag.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: any[] = [];
  relatedTags: any[] = []; // Etiquetas paginadas
  totalPages: number = 0; // Total de páginas que devuelve el backend
  currentPage: number = 0; // Página actual
  numberOfElements: number = 0; // Número de elementos en la página actual
  isLastPage: boolean = false; // Si estamos en la última página
  isFirstPage: boolean = false; // Si estamos en la primera página

  constructor(
    private questionService: QuestionService,
    private tagService: TagService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getQuestionsList();
    this.getRelatedTags(this.currentPage);
  }

  getQuestionsList(): void {
    this.questionService.getQuestions().subscribe(
      data => {
        this.questions = data.content;
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }
  getRelatedTags(page: number): void {
    this.tagService.getAllTags(page).subscribe(
      data => {
        this.relatedTags = data.content; // Etiquetas de la página actual
        this.totalPages = data.totalPages; // Total de páginas
        this.numberOfElements = data.numberOfElements; // Número de elementos en esta página
        this.isLastPage = data.last; // Si es la última página
        this.isFirstPage = data.first; // Si es la primera página
      },
      error => {
        console.error('Error fetching tags', error);
      }
    );
  }

  // Método para cambiar de página
  changePage(increment: number): void {
    const newPage = this.currentPage + increment;
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getRelatedTags(this.currentPage); // Actualiza la lista de etiquetas según la nueva página
    }
  }

  getTagClass(tag: string): { class: string; iconUrl: string } {
    switch (tag.toLowerCase()) {
      case 'javascript':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/javascript-original.svg'
        };
      case 'react':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/react-original.svg'
        };
      case 'node':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/nodejs-original-wordmark.svg'
        };
      case 'mongodb':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/mongodb-original.svg'
        };
      case 'html':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/html5-original.svg'
        };
      case 'css':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/css3-original.svg'
        };
      case 'typescript':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/typescript-original.svg'
        };
      case 'python':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/python-original.svg'
        };
      case 'ruby':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/ruby-original.svg'
        };
      case 'php':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/php-original.svg'
        };
      case 'c++':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/cplusplus-original.svg'
        };
      case 'c#':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/csharp-original.svg'
        };
      case 'c':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/c-original.svg'
        };
      case 'java':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/java-original.svg'
        };
      case 'go':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/go-original.svg'
        };
      case 'swift':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/swift-original.svg'
        };
      case 'sass':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/sass-original.svg'
        };
      case 'angular':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/angularjs-original.svg'
        };
      case 'mysql':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/mysql-original.svg'
        };
      case 'python':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/python-original.svg'
        };
      case 'python':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/python-original.svg'
        };
      case 'python':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/python-original.svg'
        };
      default:
        return { class: 'tag-default', iconUrl: '' };
    }
  }
}
