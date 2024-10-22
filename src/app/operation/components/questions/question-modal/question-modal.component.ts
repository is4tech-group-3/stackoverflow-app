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
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent implements OnInit {
  tags: any[] = [];
  totalItems: number = 0;
  currentPage: number = 0;
  selectedTags: Set<number> = new Set();
  title: string = '';
  description: string = '';
  simpleMDE: SimpleMDE | undefined;

  @ViewChild('mdeEditor', { static: true }) mdeEditor!: ElementRef;

  constructor(
    private tagService: TagService,
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getTags(this.currentPage);
    this.initializeEditor();
  }

  initializeEditor() {
    this.translate
      .get('input.questionDescription.placeholder')
      .subscribe(placeholder => {
        this.simpleMDE = new SimpleMDE({
          element: this.mdeEditor.nativeElement,
          initialValue: this.description,
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
            uniqueId: 'questionEditor'
          },
          renderingConfig: {
            codeSyntaxHighlighting: true
          },
          status: false
        });
        this.simpleMDE.codemirror.setSize('100%', '200px');
        this.simpleMDE.codemirror.getWrapperElement().style.minHeight = '200px';

        this.simpleMDE.codemirror.on('change', () => {
          this.description = this.simpleMDE?.value() || '';
        });
      });
  }

  getTags(page: number): void {
    this.tagService.getAllTags(page).subscribe(
      data => {
        this.tags = data.content;
        this.totalItems = data.totalElements;
      },
      error => {
        console.error('Error fetching tags', error);
      }
    );
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getTags(this.currentPage);
  }

  toggleTagSelection(tagId: number) {
    if (this.selectedTags.has(tagId)) {
      this.selectedTags.delete(tagId);
    } else {
      if (this.selectedTags.size < 8) {
        this.selectedTags.add(tagId);
      }
    }
  }

  isTagSelected(tagId: number): boolean {
    return this.selectedTags.has(tagId);
  }

  saveQuestion() {
    const question = {
      title: this.title,
      description: marked(this.description),
      idTags: Array.from(this.selectedTags)
    };

    this.questionService.createQuestion(question).subscribe({
      next: response => {
        this.dialogRef.close('created');
      },
      error: error => {
        console.error('Error creating question:', error);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  getTagClass(tag: string): { iconUrl: string } {
    switch (tag.toLowerCase()) {
      case 'javascript':
        return {
          iconUrl: 'https://icongr.am/devicon/javascript-original.svg'
        };
      case 'reactjs':
        return {
          iconUrl: 'https://icongr.am/devicon/react-original.svg'
        };
      case 'nodejs':
        return {
          iconUrl: 'https://icongr.am/devicon/nodejs-original.svg'
        };
      case 'mongodb':
        return {
          iconUrl: 'https://icongr.am/devicon/mongodb-original.svg'
        };
      case 'html':
        return {
          iconUrl: 'https://icongr.am/devicon/html5-original.svg'
        };
      case 'css':
        return {
          iconUrl: 'https://icongr.am/devicon/css3-original.svg'
        };
      case 'typescript':
        return {
          iconUrl: 'https://icongr.am/devicon/typescript-original.svg'
        };
      case 'python':
        return {
          iconUrl: 'https://icongr.am/devicon/python-original.svg'
        };
      case 'ruby':
        return {
          iconUrl: 'https://icongr.am/devicon/ruby-original.svg'
        };
      case 'php':
        return {
          iconUrl: 'https://icongr.am/devicon/php-original.svg'
        };
      case 'c++':
        return {
          iconUrl: 'https://icongr.am/devicon/cplusplus-original.svg'
        };
      case 'c#':
        return {
          iconUrl: 'https://icongr.am/devicon/csharp-original.svg'
        };
      case 'c':
        return {
          iconUrl: 'https://icongr.am/devicon/c-original.svg'
        };
      case 'java':
        return {
          iconUrl: 'https://icongr.am/devicon/java-original.svg'
        };
      case 'go':
        return {
          iconUrl: 'https://icongr.am/devicon/go-original.svg'
        };
      case 'swift':
        return {
          iconUrl: 'https://icongr.am/devicon/swift-original.svg'
        };
      case 'sass':
        return {
          iconUrl: 'https://icongr.am/devicon/sass-original.svg'
        };
      case 'angular':
        return {
          iconUrl: 'https://icongr.am/devicon/angularjs-original.svg'
        };
      case 'mysql':
        return {
          iconUrl: 'https://icongr.am/devicon/mysql-original.svg'
        };
      case 'vuejs':
        return {
          iconUrl: 'https://icongr.am/devicon/vuejs-original.svg'
        };
      case 'postgresql':
        return {
          iconUrl: 'https://icongr.am/devicon/postgresql-original.svg'
        };
      case 'npm':
        return {
          iconUrl: 'https://icongr.am/devicon/npm-original-wordmark.svg'
        };
      case 'github':
        return {
          iconUrl: 'https://icongr.am/devicon/github-original.svg'
        };
      case 'git':
        return {
          iconUrl: 'https://icongr.am/devicon/git-original.svg'
        };
      case 'expressjs':
        return {
          iconUrl: 'https://icongr.am/devicon/express-original.svg'
        };
      case 'docker':
        return {
          iconUrl: 'https://icongr.am/devicon/docker-original.svg'
        };
      case 'django':
        return {
          iconUrl: 'https://icongr.am/devicon/django-original.svg'
        };
      case 'bitbucket':
        return {
          iconUrl: 'https://icongr.am/devicon/bitbucket-original.svg'
        };
      case 'jenkins':
        return {
          iconUrl: 'https://icongr.am/simple/jenkins.svg?&colored=true'
        };
      case 'terraform':
        return {
          iconUrl: 'https://icongr.am/simple/terraform.svg?&colored=true'
        };
      case 'rust':
        return {
          iconUrl: 'https://icongr.am/simple/rust.svg?&colored=true'
        };
      case 'kotlin':
        return {
          iconUrl: 'https://icongr.am/simple/kotlin.svg?&colored=true'
        };
      case 'kubernetes':
        return {
          iconUrl: 'https://icongr.am/simple/kubernetes.svg?&colored=true'
        };
      case 'svelte':
        return {
          iconUrl: 'https://icongr.am/simple/svelte.svg?&colored=true'
        };
      case 'flask':
        return {
          iconUrl: 'https://icongr.am/simple/flask.svg?&colored=true'
        };
      case 'ansible':
        return {
          iconUrl: 'https://icongr.am/simple/ansible.svg'
        };
      case 'jwt':
        return {
          iconUrl: 'https://icongr.am/simple/jsonwebtokens.svg?&colored=true'
        };
      case 'springboot':
        return {
          iconUrl: 'https://icongr.am/simple/spring.svg?&colored=true'
        };
      default:
        return { iconUrl: '' };
    }
  }
}
