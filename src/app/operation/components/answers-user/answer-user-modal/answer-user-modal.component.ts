import {
  Component,
  Inject,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagService } from 'src/app/admin/service/tag.service';
import { QuestionService } from 'src/app/operation/service/question/question.service';
import * as SimpleMDE from 'simplemde';
import { marked } from 'marked';

@Component({
  selector: 'app-answer-user-modal',
  templateUrl: './answer-user-modal.component.html',
  styleUrls: ['./answer-user-modal.component.scss']
})
export class AnswerUserModalComponent implements OnInit {
  tags: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  isLastPage: boolean = false;
  isFirstPage: boolean = false;
  selectedTags: Set<any> = new Set();
  title: string = '';
  description: string = '';

  simpleMDE: SimpleMDE | undefined;

  @ViewChild('mdeEditor', { static: true }) mdeEditor!: ElementRef;

  constructor(
    private tagService: TagService,
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<AnswerUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.currentPage = this.data.page || 0;
    this.title = this.data.question.title; 
    this.description = this.data.question.description; 
    this.selectedTags = new Set(this.data.question.tags.map((tag: any) => tag.idTag)); 
    this.getTags(this.currentPage);
    this.initializeEditor();
}


  initializeEditor() {
    this.simpleMDE = new SimpleMDE({
      element: this.mdeEditor.nativeElement,
      initialValue: this.description,
      placeholder: 'Describe tu pregunta...',
      toolbar: [
        'bold',
        'italic',
        '',
        'link',
        'quote',
        {
          name: 'code',
          action: SimpleMDE.toggleCodeBlock,
          className: 'fa fa-code',
          title: 'Insertar código'
        },
        '',
        'ordered-list',
        'unordered-list',
        'horizontal-rule',
        '',
        'undo',
        'redo',
        ''
      ],
      autosave: {
        enabled: false,
        uniqueId: 'answerEditor'
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    });

    this.simpleMDE.codemirror.on('change', () => {
      this.description = this.simpleMDE?.value() || '';
    });
  }

  getTags(page: number): void {
    this.tagService.getAllTags(page).subscribe(
      data => {
        this.tags = data.content;
        this.totalPages = data.totalPages;
        this.isLastPage = data.last;
        this.isFirstPage = data.first;
      },
      error => {
        console.error('Error fetching tags', error);
      }
    );
  }

  changePage(increment: number): void {
    const newPage = this.currentPage + increment;
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.getTags(this.currentPage);
    }
  }

  toggleTagSelection(tag: any) {
    const tagId = tag.idTag;

    if (this.selectedTags.has(tagId)) {
        this.selectedTags.delete(tagId);
    } else {
        this.selectedTags.add(tagId);
    }
}




isTagSelected(tag: any): boolean {
  return this.selectedTags.has(tag.idTag);
}





saveQuestion() {
  const question = {
      title: this.title,
      description: marked(this.description),
      idTags: Array.from(this.selectedTags)
  };

  const questionId = this.data.question.idQuestion; 

  console.log('Selected tags:', Array.from(this.selectedTags)); 
  console.log('Question object to save:', question);

  if (questionId) {
      this.questionService.updateQuestion(questionId, question).subscribe({
          next: response => {
              this.dialogRef.close(response);
          },
          error: error => {
              console.error('Error updating question:', error);
          }
      });
  } else {
      console.error('Question ID is undefined.');
  }
}




  close(): void {
    this.dialogRef.close();
  }

  getTagClass(tag: string): { class: string; iconUrl: string } {
    switch (tag.toLowerCase()) {
      case 'javascript':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/javascript-original.svg'
        };
      case 'reactjs':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/react-original.svg'
        };
      case 'nodejs':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/nodejs-original.svg'
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
      case 'vuejs':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/vuejs-original.svg'
        };
      case 'postgresql':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/postgresql-original.svg'
        };
      case 'npm':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/npm-original-wordmark.svg'
        };
      case 'github':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/github-original.svg'
        };
      case 'git':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/git-original.svg'
        };
      case 'expressjs':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/express-original.svg'
        };
      case 'docker':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/docker-original.svg'
        };
      case 'django':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/django-original.svg'
        };
      case 'bitbucket':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/devicon/bitbucket-original.svg'
        };
      case 'jenkins':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/jenkins.svg?&colored=true'
        };
      case 'terraform':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/terraform.svg?&colored=true'
        };
      case 'rust':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/rust.svg?&colored=true'
        };
      case 'kotlin':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/kotlin.svg?&colored=true'
        };
      case 'kubernetes':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/kubernetes.svg?&colored=true'
        };
      case 'svelte':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/svelte.svg?&colored=true'
        };
      case 'flask':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/flask.svg?&colored=true'
        };
      case 'ansible':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/ansible.svg'
        };
      case 'jwt':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/jsonwebtokens.svg?&colored=true'
        };
      case 'springboot':
        return {
          class: 'tag-default',
          iconUrl: 'https://icongr.am/simple/spring.svg?&colored=true'
        };
      default:
        return { class: 'tag-default', iconUrl: '' };
    }
  }
}
