import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../service/question/question.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/sesion/session.service';
import { CookieUtil } from 'src/app/shared/utils/CookieUtil';
import { UserService } from 'src/app/admin/service/user.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {
  myQuestions: any[] = [];
  relatedTags: any[] = [];
  visibleTags: any[] = [];
  user: any = null; 
  showAllTags: boolean = false;
  maxVisibleTags: number = 5;
  currentUserId: string | null = null;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.sessionService.isLoggedIn()) {
      this.getCurrentUserId();
      this.loadUserProfile();
    }
  }

  sanitizeDescription(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  getCurrentUserId(): void {
    this.currentUserId = CookieUtil.getValue('userId');
    console.log('Current User ID:', this.currentUserId);
  }

  getMyQuestions(): void {
    this.questionService.getQuestions().subscribe(
      data => {
        console.log('All Questions:', data.content);
        this.myQuestions = data.content.filter((question: any) => 
          question.author.idUser === Number(this.currentUserId)
        ).map((question: any) => ({
          ...question,
          description: this.sanitizeDescription(question.description)
        }));

        console.log('Filtered My Questions:', this.myQuestions);
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }

  loadUserProfile(): void {
    if (this.currentUserId) {
      this.userService.getUserById(Number(this.currentUserId)).subscribe({
        next: (response) => {
          this.user = response;
          console.log('User Profile:', this.user);
          this.getMyQuestions();
        },
        error: () => {
          console.error('Error fetching user profile');
        }
      });
    } else {
      console.error('User ID not found');
    }
  }
  
  showMoreTags(): void {
    this.showAllTags = true;
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

  viewQuestion(questionId: number): void {
    this.router.navigate(['/answers-user', questionId]);
  }
}
