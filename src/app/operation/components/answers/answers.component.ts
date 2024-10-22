import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../service/question/question.service';
import { AnswerService } from '../../service/answer/answer.service';
import { AnswerLikeService } from '../../service/answer-like/answer-like.service';
import { AnswerModalComponent } from './answer-modal/answer-modal.component';
import hljs from 'highlight.js';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit, AfterViewChecked {
  question: any;
  answers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private answerLikeService: AnswerLikeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const questionId = params['idQuestion'];
      if (questionId && !isNaN(Number(questionId))) {
        this.getQuestionDetails(Number(questionId));
        this.getAnswers(Number(questionId));
      } else {
        console.error('Invalid question ID:', questionId);
      }
    });
  }

  getQuestionDetails(id: number): void {
    this.questionService.getQuestionById(id).subscribe(
      data => {
        console.log('Question data:', data);
        this.question = data;
      },
      error => {
        console.error('Error fetching question details', error);
      }
    );
  }

  getAnswers(idQuestion: number): void {
    this.answerService.getAnswersByQuestion(idQuestion).subscribe(
      data => {
        console.log('Respuestas obtenidas:', data);
        this.answers = data.content;
        this.answers.forEach(answer => {
          this.getLikesForAnswer(answer.idAnswer);
        });
      },
      error => {
        console.error('Error al obtener respuestas', error);
      }
    );
  }

  getLikesForAnswer(idAnswer: number): void {
    this.answerLikeService.getLikes(idAnswer).subscribe(
      likes => {
        const answer = this.answers.find(ans => ans.idAnswer === idAnswer);
        if (answer) {
          answer.likes = likes;
        }
      },
      error => {
        console.error(`Error fetching likes for answer ID ${idAnswer}`, error);
      }
    );
  }

  ngAfterViewChecked(): void {
    const blocks = document.querySelectorAll('pre code');
    blocks.forEach(block => {
      if (!block.hasAttribute('data-highlighted')) {
        hljs.highlightElement(block as HTMLElement);
        block.setAttribute('data-highlighted', 'yes');
      }
    });
  }

  openQuestionModal(idQuestion: number): void {
    this.dialog.open(AnswerModalComponent, {
      data: { idQuestion }
    });
  }

  openAnswerModal(idAnswer?: number): void {
    const dialogRef = this.dialog.open(AnswerModalComponent, {
      data: { idQuestion: this.question.idQuestion, idAnswer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getAnswers(this.question.idQuestion);
      }
    });
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
