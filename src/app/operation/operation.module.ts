import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NewsComponent } from './components/news/news.component';
import { OperationRoutingModule } from './operation-routing.module';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionModalComponent } from './components/questions/question-modal/question-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { AnswersComponent } from './components/answers/answers.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { MyQuestionsComponent } from './components/my-questions/my-questions.component';
import { AnswersUserComponent } from './components/answers-user/answers-user.component';
import { AnswerUserModalComponent } from './components/answers-user/answer-user-modal/answer-user-modal.component';


@NgModule({
  declarations: [
    NewsComponent,
    QuestionsComponent,
    QuestionModalComponent, ProfileComponent, NewsDetailComponent,
    AnswersComponent,
    MyQuestionsComponent,
    AnswersUserComponent,
    AnswerUserModalComponent
  ],
  imports: [SharedModule, OperationRoutingModule, HighlightModule],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ]
})
export class OperationModule {}