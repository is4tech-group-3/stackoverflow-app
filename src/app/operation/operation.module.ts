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
import { NgxPaginationModule } from 'ngx-pagination';
import { AnswerModalComponent } from './components/answers/answer-modal/answer-modal.component';
import { AnswersUserComponent } from './components/answers-user/answers-user.component';
import { AnswersUserModalComponent } from './components/answers-user/answers-user-modal/answers-user-modal.component';
import { MyQuestionsComponent } from './components/my-questions/my-questions.component';

@NgModule({
  declarations: [
    NewsComponent,
    QuestionsComponent,
    QuestionModalComponent,
    ProfileComponent,
    NewsDetailComponent,
    AnswersComponent,
    AnswerModalComponent,
    AnswersUserComponent,
    AnswersUserModalComponent,
    MyQuestionsComponent
  ],
  imports: [
    SharedModule,
    OperationRoutingModule,
    HighlightModule,
    NgxPaginationModule
  ],
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
